import { NextFunction, Request, Response } from "express";
import { DailyReportSchema, ReportSchema, RideSchema } from "../models/Ride";
import { RideService } from "../services/RideService";
import { isDateValid } from "../utils/dateUtils";
import validate from "../utils/validate";

export class RideController {
	private rideService: RideService;

	constructor() {
		this.rideService = new RideService();
	}

	addRide(req: Request, res: Response, next: NextFunction) {
		const parsedBody = validate(req.body, RideSchema);
		if (!isDateValid(parsedBody.date)) {
			return res.status(400).send("Invalid date");
		}
		this.rideService.addRide(parsedBody);
		return res.sendStatus(201);
	}

	dailyReport(req: Request, res: Response, next: NextFunction) {
		const { date } = validate(req.query, DailyReportSchema);
		if (!isDateValid(date)) {
			return res.status(400).send("Invalid date");
		}
		const report = this.rideService.getDailyReport(date);
		return res.status(200).json(report);
	}

	report(req: Request, res: Response, next: NextFunction) {
		const { startDate, endDate } = validate(req.query, ReportSchema);
		if (!isDateValid(startDate) || !isDateValid(endDate)) {
			return res.status(400).send("Invalid date");
		}
		if (startDate > endDate) {
			return res.status(400).send("Invalid date range");
		}
		const report = this.rideService.getReport(startDate, endDate);
		return res.status(200).json(report);
	}
}
