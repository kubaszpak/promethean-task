import {
	getNumberOfDays,
	isDateInRange,
	isDateValid,
} from "../../src/utils/dateUtils";

describe("Ride API tests", () => {
	it("should be valid date", async () => {
		const result = isDateValid("2023-06-18");
		expect(result).toBeTruthy();
	});

	it("should be invalid date because of month", async () => {
		const result = isDateValid("2023-13-18");
		expect(result).toBeFalsy();
	});

	it("should be invalid date because of day", async () => {
		const result = isDateValid("2023-02-30");
		expect(result).toBeFalsy();
	});

	it("should be date in range", async () => {
		const result = isDateInRange("2023-02-20", "2023-02-16", "2023-02-24");
		expect(result).toBeTruthy();
	});

	it("should be date out of range", async () => {
		const result = isDateInRange("2023-02-25", "2023-02-16", "2023-02-24");
		expect(result).toBeFalsy();
	});

	it("should be startDate in range", async () => {
		const result = isDateInRange("2023-02-16", "2023-02-16", "2023-02-24");
		expect(result).toBeTruthy();
	});

	it("should be endDate in range", async () => {
		const result = isDateInRange("2023-02-24", "2023-02-16", "2023-02-24");
		expect(result).toBeTruthy();
	});

	it("should be correct number of days in range", async () => {
		const result = getNumberOfDays("2023-02-16", "2023-02-24");
		expect(result).toEqual(9);
	});

	it("should be correct number of days in range - end of month", async () => {
		const result = getNumberOfDays("2023-02-27", "2023-03-02");
		expect(result).toEqual(4);
	});
});
