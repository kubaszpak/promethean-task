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
				date: "2023-30-30",
			});

		expect(response.status).toBe(400);
		expect(JSON.stringify(response.body)).toContain(
			"Expected number, received string"
		);
	});
});
