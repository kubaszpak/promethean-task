import { AnyZodObject, ZodError, z } from "zod";

export default function validate<T extends AnyZodObject>(
	obj: any,
	schema: T
): z.infer<T> {
	try {
		const parsedObj = schema.parse(obj);
		return parsedObj;
	} catch (err) {
		if (err instanceof ZodError) {
			throw err;
		}
		throw new Error(
			"Error while parsing: " +
				JSON.stringify(obj) +
				"\n\n" +
				JSON.stringify(err)
		);
	}
}
