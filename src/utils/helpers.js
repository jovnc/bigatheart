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

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function sortByDate(dataArr) {
  function compare(a, b) {
    const aTime = new Date(a.events.date);
    const bTime = new Date(b.events.date);

    if (aTime > bTime) {
      return 1;
    }
    if (aTime < bTime) {
      return -1;
    }
    return 0;
  }

  return dataArr.sort(compare);
}

export function eventsPerMonthGraph(dataArr) {
  const output = [];
  const today = new Date();
  const currMonth = today.getMonth();

  for (let i = currMonth - 6; i <= currMonth; i++) {
    let monthString = today.toLocaleString("default", { month: "short" });
    createAndPush(monthString, getTotalHours(i));
  }

  return output;

  function createAndPush(name, uv) {
    let obj = {};
    obj.name = name;
    obj.uv = uv;
    output.append(obj);
  }

  function getTotalHours(month) {
    function acc(next, acc) {
      let eventDate = new Date(next.events.date);
      let eventMonth = eventDate.getTime();
      if (eventMonth == month) {
        return Math.floor(next.events.duration / 60) + acc;
      } else {
        return acc;
      }
    }
    return dataArr.reduce(acc, 0);
  }
}
