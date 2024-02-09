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
    const aTime = new Date(`${a.events.date} ${a.events.time}`);
    const bTime = new Date(`${b.events.date} ${b.events.time}`);
    console.log(aTime);

    if (aTime > bTime) {
      return -1;
    }
    if (aTime < bTime) {
      return 1;
    }
    return 0;
  }

  return dataArr.sort(compare);
}

export function sortByDateAlt(dataArr) {
  function compare(a, b) {
    const aTime = new Date(`${a.date} ${a.time}`);
    const bTime = new Date(`${b.date} ${b.time}`);

    if (aTime > bTime) {
      return -1;
    }
    if (aTime < bTime) {
      return 1;
    }
    return 0;
  }

  return dataArr.sort(compare);
}

// get the mins volunteered for the past 4 months

export function minsPerMonthGraph(dataArr) {
  const output = [];
  const today = new Date();
  const currMonth = today.getMonth();

  for (let i = currMonth - 3; i <= currMonth; i++) {
    let monthString = "null";
    switch ((i + 12) % 12) {
      case 0:
        monthString = "Jan";
        break;
      case 1:
        monthString = "Feb";
        break;
      case 2:
        monthString = "Mar";
        break;
      case 3:
        monthString = "Apr";
        break;
      case 4:
        monthString = "May";
        break;
      case 5:
        monthString = "Jun";
        break;
      case 6:
        monthString = "Jul";
        break;
      case 7:
        monthString = "Aug";
        break;
      case 8:
        monthString = "Sep";
        break;
      case 9:
        monthString = "Oct";
        break;
      case 10:
        monthString = "Nov";
        break;
      case 11:
        monthString = "Dec";
        break;
    }
    createAndPush(monthString, getTotalMins(dataArr, i));
  }

  return output;

  function createAndPush(name, uv) {
    let obj = {};
    obj.name = name;
    obj.minutes = uv;
    output.push(obj);
  }

  function getTotalMins(dataArr, month) {
    let sum = 0;
    for (let i = 0; i < dataArr.length; i++) {
      let eventDate = new Date(dataArr[i].events.date);
      let eventMonth = eventDate.getMonth();
      if (eventMonth == month) {
        sum += dataArr[i].events.duration;
      }
    }
    return sum;
  }
}

export function topCategoriesGraph(dataArr) {
  if (!dataArr) return null;
  const output = [];
  const memo = [];

  for (let i = 0; i < dataArr.length; i++) {
    if (!isMemberOf(dataArr[i].events.category, memo)) {
      createAndPush(
        dataArr[i].events.category,
        getTotalMins(dataArr[i].events.category)
      );
      memo.push(dataArr[i].events.category);
    }
  }
  return output;

  function createAndPush(name, uv) {
    let obj = {};
    obj.name = name;
    obj.minutes = uv;
    output.push(obj);
  }

  function isMemberOf(key, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (key == arr[i]) {
        return true;
      }
    }
    return false;
  }

  function getTotalMins(categories) {
    let sum = 0;
    for (let i = 0; i < dataArr.length; i++) {
      if (
        dataArr[i].events.category == categories &&
        dataArr[i].attended &&
        dataArr[i].finished
      ) {
        sum += dataArr[i].events.duration;
      }
    }
    return sum;
  }
}
