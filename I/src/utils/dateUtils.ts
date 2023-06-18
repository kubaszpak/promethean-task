export const isDateValid = (dateString: string): boolean => {
	const [year, month, day] = dateString.split("-");
	const date = new Date(dateString);
	return (
		date instanceof Date &&
		!isNaN(date.getTime()) &&
		date.getFullYear() === Number(year) &&
		date.getMonth() + 1 === Number(month) &&
		date.getDate() === Number(day)
	);
};

export const isDateInRange = (
	date: string,
	startDate: string,
	endDate: string
): boolean => {
	const currentDate = new Date(date);
	const start = new Date(startDate);
	const end = new Date(endDate);
	return currentDate >= start && currentDate <= end;
};

export const getNumberOfDays = (startDate: string, endDate: string): number => {
	const difference =
		new Date(endDate).getTime() - new Date(startDate).getTime();
	return Math.ceil(difference / (1000 * 3600 * 24)) + 1;
};
