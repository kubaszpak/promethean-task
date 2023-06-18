import { z } from "zod";

const latitudeRegex = /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$/; // examples: 23.4412 -3.122 5
const longitudeRegex = /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/; //  examples: 23.4412 -3.122 5
const simpleDateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/; // yyyy-mm-dd

export const LatLngSchema = z.object({
	latitude: z.string().regex(latitudeRegex),
	longitude: z.string().regex(longitudeRegex),
});

export const RideSchema = z.object({
	startAddress: LatLngSchema,
	endAddress: LatLngSchema,
	cost: z.number(),
	date: z.string().regex(simpleDateRegex, { message: "Invalid date format" }),
});

export const DailyReportSchema = z.object({
	date: z.string().regex(simpleDateRegex, { message: "Invalid date format" }),
});

export const ReportSchema = z.object({
	startDate: z
		.string()
		.regex(simpleDateRegex, { message: "Invalid date format" }),
	endDate: z
		.string()
		.regex(simpleDateRegex, { message: "Invalid date format" }),
});

export type LatLng = z.infer<typeof LatLngSchema>;

export type Ride = z.infer<typeof RideSchema>;
