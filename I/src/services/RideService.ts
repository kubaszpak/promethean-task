import { Ride } from "../models/Ride";

export class RideService {
	private rides: Ride[];

	constructor() {
		this.rides = [];
	}

	public addRide(ride: Ride): void {
		this.rides.push(ride);
	}

	public getDailyReport(date: string) {
		const ridesOnDate = this.rides.filter((ride) => ride.date === date);
		const report = {
			totalDistance: 0,
			totalCost: 0,
		};
		for (const ride of ridesOnDate) {
			report.totalDistance += calculateDistance(ride);
			report.totalCost += ride.cost;
		}
		return report;
	}
}

const calculateDistance = (ride: Ride) => {
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
