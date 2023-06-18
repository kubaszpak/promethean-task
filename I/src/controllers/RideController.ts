import { NextFunction, Request, Response } from "express";
import { DailyReportSchema, RideSchema } from "../models/Ride";
import { RideService } from "../services/RideService";
import { isDateValid } from "../utils/dateUtils";

export class RideController {
	private rideService: RideService;

	constructor() {
		this.rideService = new RideService();
	}

	addRide(req: Request, res: Response, next: NextFunction) {
		try {
			const parsedBody = RideSchema.parse(req.body);
			if (!isDateValid(parsedBody.date)) {
				return res.status(400).send("Invalid date");
			}
			this.rideService.addRide(parsedBody);
			return res.sendStatus(201);
		} catch (err) {
			return res.status(400).json(err);
		}
	}

	dailyReport(req: Request, res: Response, next: NextFunction) {
		try {
			const { date } = DailyReportSchema.parse(req.query);
			if (!isDateValid(date)) {
				return res.status(400).send("Invalid date");
			}
			const report = this.rideService.getDailyReport(date);
			return res.status(200).json(report);
		} catch (err) {
			return res.status(400).json(err);
		}
	}
}
