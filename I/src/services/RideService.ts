import { Ride } from "../models/Ride";
import { getNumberOfDays, isDateInRange } from "../utils/dateUtils";

export class RideService {
	private rides: Ride[];

	constructor() {
		this.rides = [];
	}

	public addRide(ride: Ride): void {
		this.rides.push(ride);
	}

	public getRides(): Ride[] {
		return this.rides;
	}

	public getDailyReport(date: string) {
		const ridesOnDate = this.rides.filter((ride) => ride.date === date);
		return this.getTotalsFromRides(ridesOnDate);
	}

	public getReport(startDate: string, endDate: string) {
		const ridesInRange = this.rides.filter((ride) =>
			isDateInRange(ride.date, startDate, endDate)
		);
		const report = this.getTotalsFromRides(ridesInRange);
		const numberOfDays = getNumberOfDays(startDate, endDate);
		console.log("numberOfDays: " + numberOfDays);
		return {
			...report,
			averageDailyDistance: report.totalDistance / numberOfDays,
			averageDailyCost: report.totalCost / numberOfDays,
		};
	}

	private getTotalsFromRides(rides: Ride[]) {
		const report = {
			totalDistance: 0,
			totalCost: 0,
		};
		for (const ride of rides) {
			report.totalDistance += calculateDistance(ride);
			report.totalCost += ride.cost;
		}
		return report;
	}
}

const calculateDistance = (ride: Ride) => {
	// https://www.movable-type.co.uk/scripts/latlong.html
	const lat1 = Number(ride.startAddress.latitude);
	const lat2 = Number(ride.endAddress.latitude);

	const lon1 = Number(ride.startAddress.longitude);
	const lon2 = Number(ride.endAddress.longitude);

	const R = 6371e3; // metres
	const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
	const φ2 = (lat2 * Math.PI) / 180;
	const Δφ = ((lat2 - lat1) * Math.PI) / 180;
	const Δλ = ((lon2 - lon1) * Math.PI) / 180;

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const d = R * c; // in metres
	return Math.round(d) / 1000; // in km
};
