import { z } from "zod";

export const LatLngSchema = z.object({
	latitude: z.string().regex(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$/),
	longitude: z
		.string()
		.regex(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/),
});

export const RideSchema = z.object({
	startAddress: LatLngSchema,
	endAddress: LatLngSchema,
	cost: z.number(),
	date: z.coerce.date(),
});

export const DailyReportSchema = z.object({});

export type LatLng = z.infer<typeof LatLngSchema>;

export type Ride = z.infer<typeof RideSchema>;
