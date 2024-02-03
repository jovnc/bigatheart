export function convertToAMPM(time24) {
	// Split the input time string into hours, minutes, and seconds
	const [hours, minutes, seconds] = time24.split(":");

	// Convert hours to 12-hour format
	let hours12 = parseInt(hours, 10) % 12;
	hours12 = hours12 === 0 ? 12 : hours12; // 0 should be converted to 12 for 12-hour clock

	// Determine if it's AM or PM
	const period = parseInt(hours, 10) < 12 ? "am" : "pm";

	// Format the result as a string with a colon between hours and minutes
	const time12 = `${hours12}:${minutes}${period}`;

	return time12;
}

export function convertDateFormat(inputDate) {
	// Create a Date object from the input date string
	const dateObject = new Date(inputDate);

	// Get day, month, and year from the Date object
	const day = dateObject.getDate();

	// Get the month name
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const monthIndex = dateObject.getMonth();
	const month = monthNames[monthIndex];

	const year = dateObject.getFullYear();

	// Format the result as a string
	const formattedDate = `${day} ${month} ${year}`;

	return formattedDate;
}
