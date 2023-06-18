import { NextFunction, Request, Response } from "express";
import { RideSchema } from "../models/Ride";
import { RideService } from "../services/RideService";

export class RideController {
	private rideService: RideService;

	constructor() {
		this.rideService = new RideService();
	}

	addRide(req: Request, res: Response, next: NextFunction) {
		try {
			const parsedBody = RideSchema.parse(req.body);
			this.rideService.addRide(parsedBody);
			return res.sendStatus(201);
		} catch (err) {
			return res.status(400).json(err);
		}
	}

	

	
}
