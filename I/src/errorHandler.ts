import { ZodError } from "zod";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	console.error(err.stack);
	if (err instanceof ZodError) {
		res.status(400).json(err);
	} else {
		res.status(500).send("Something broke!");
	}
};
