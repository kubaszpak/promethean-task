import { NextFunction, Request, Response } from "express";
import { DailyReportSchema, ReportSchema, RideSchema } from "../models/Ride";
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

	report(req: Request, res: Response, next: NextFunction) {
		try {
			const { startDate, endDate } = ReportSchema.parse(req.query);
			if (!isDateValid(startDate) || !isDateValid(endDate)) {
				return res.status(400).send("Invalid date");
			}
			if (startDate > endDate) {
				return res.status(400).send("Invalid date range");
			}
			const report = this.rideService.getReport(startDate, endDate);
			return res.status(200).json(report);
		} catch (err) {
			return res.status(400).json(err);
		}
	}
}
