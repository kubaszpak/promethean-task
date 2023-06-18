import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { RideController } from "./controllers/RideController";

const app = express();
app.use(bodyParser.json());

const rideController = new RideController();

app.get("/", (req: Request, res: Response) => {
	res.send("Hello world");
});

app.post("/rides", (req: Request, res: Response, next: NextFunction) => {
	rideController.addRide(req, res, next);
});

export default app;
