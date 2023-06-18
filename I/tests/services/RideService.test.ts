import { Ride } from "../../src/models/Ride";
import { RideService } from "../../src/services/RideService";

describe("RideService", () => {
	let rideService: RideService;

	beforeEach(() => {
		rideService = new RideService();
	});

	describe("addRide", () => {
		it("should add a ride to the database", () => {
			const rideData: Ride = {
				startAddress: {
					latitude: "51.116956",
					longitude: "17.000223",
				},
				endAddress: {
					latitude: "51.11747",
					longitude: "17.00314",
				},
				cost: 50,
				date: "2023-06-15",
			};

			rideService.addRide(rideData);

			expect(rideService.getRides()).toHaveLength(1);
		});
	});

	describe("getDailyReport", () => {
		it("should calculate daily report for the given date", () => {
			const date = "2023-06-15";

			const result = rideService.getDailyReport(date);

			expect(result).toEqual({ totalDistance: 0, totalCost: 0 });
		});
	});

	describe("getReport", () => {
		it("should calculate report for the given start and end dates", () => {
			const startDate = "2023-06-15";
			const endDate = "2023-06-16";

			const result = rideService.getReport(startDate, endDate);

			expect(result).toEqual({
				totalDistance: 0,
				totalCost: 0,
				averageDailyDistance: 0,
				averageDailyCost: 0,
			});
		});
	});
});
