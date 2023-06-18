import request from "supertest";
import app from "../src/app";

describe("Ride API tests", () => {
	it("should add a ride", async () => {
		const response = await request(app)
			.post("/rides")
			.send({
				startAddress: {
					latitude: "51.1246336",
					longitude: "16.9934848",
				},
				endAddress: {
					latitude: "51.1222001",
					longitude: "16.9932297",
				},
				cost: 50,
				date: "2023-06-18",
			});

		expect(response.status).toBe(201);
	});

	it("should not allow cost as string", async () => {
		const response = await request(app)
			.post("/rides")
			.send({
				startAddress: {
					latitude: "51.1246336",
					longitude: "16.9934848",
				},
				endAddress: {
					latitude: "51.1222001",
					longitude: "16.9932297",
				},
				cost: "cost",
				date: "2023-06-18",
			});

		expect(response.status).toBe(400);
		expect(JSON.stringify(response.body)).toContain(
			"Expected number, received string"
		);
	});

	it("should return Invalid date format", async () => {
		const response = await request(app)
			.post("/rides")
			.send({
				startAddress: {
					latitude: "51.1246336",
					longitude: "16.9934848",
				},
				endAddress: {
					latitude: "51.1222001",
					longitude: "16.9932297",
				},
				cost: 20,
				date: "18.06.2018",
			});

		expect(response.status).toBe(400);
		expect(JSON.stringify(response.body)).toContain("Invalid date format");
	});

	it("should return Invalid date", async () => {
		const response = await request(app)
			.post("/rides")
			.send({
				startAddress: {
					latitude: "51.1246336",
					longitude: "16.9934848",
				},
				endAddress: {
					latitude: "51.1222001",
					longitude: "16.9932297",
				},
				cost: 20,
				date: "2018-99-11",
			});

		expect(response.status).toBe(400);
		expect(response.text).toBe("Invalid date");
	});

	it("should generate empty daily report", async () => {
		const date = "2023-06-23";
		const response = await request(app).get(`/daily-report?date=${date}`);

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({
			totalDistance: 0,
			totalCost: 0,
		});
	});

	it("should include ride in the daily report", async () => {
		const date = "2023-06-23";

		const addRideResponse = await request(app)
			.post("/rides")
			.send({
				startAddress: {
					latitude: "51.1246336",
					longitude: "16.9934848",
				},
				endAddress: {
					latitude: "51.1222001",
					longitude: "16.9932297",
				},
				cost: 20,
				date: date,
			});
		expect(addRideResponse.status).toBe(201);

		const getDailyReportResponse = await request(app).get(
			`/daily-report?date=${date}`
		);

		expect(getDailyReportResponse.status).toBe(200);
		expect(getDailyReportResponse.body.totalCost).toEqual(20);
		expect(getDailyReportResponse.body.totalDistance).toBeCloseTo(0.271);
	});

	it("should generate empty report", async () => {
		const startDate = "2023-05-23";
		const endDate = "2023-05-29";

		const response = await request(app).get(
			`/report?startDate=${startDate}&endDate=${endDate}`
		);

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({
			totalDistance: 0,
			totalCost: 0,
			averageDailyDistance: 0,
			averageDailyCost: 0,
		});
	});

	it("should include ride in the daily report", async () => {
		const startDate = "2023-05-13";
		const endDate = "2023-05-14";

		const addRideResponse = await request(app)
			.post("/rides")
			.send({
				startAddress: {
					latitude: "51.1246336",
					longitude: "16.9934848",
				},
				endAddress: {
					latitude: "51.1222001",
					longitude: "16.9932297",
				},
				cost: 20,
				date: startDate,
			});
		expect(addRideResponse.status).toBe(201);

		const getDailyReportResponse = await request(app).get(
			`/report?startDate=${startDate}&endDate=${endDate}`
		);

		expect(getDailyReportResponse.status).toBe(200);
		expect(getDailyReportResponse.body.totalCost).toEqual(20);
		expect(getDailyReportResponse.body.totalDistance).toBeCloseTo(0.271);
		expect(getDailyReportResponse.body.averageDailyDistance).toEqual(0.1355);
		expect(getDailyReportResponse.body.averageDailyCost).toEqual(10);
	});
});
