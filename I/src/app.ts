import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { RideController } from "./controllers/RideController";

const app = express();
app.use(bodyParser.json());
app.use(morgan("tiny"));

const rideController = new RideController();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello world");
});

app.post("/rides", (req: Request, res: Response, next: NextFunction) => {
	rideController.addRide(req, res, next);
});

app.get("/daily-report", (req: Request, res: Response, next: NextFunction) => {
	rideController.dailyReport(req, res, next);
});

app.get("/report", (req: Request, res: Response, next: NextFunction) => {
	rideController.report(req, res, next);
});

export default app;
