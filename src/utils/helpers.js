import * as XLSX from "xlsx";

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

export function sortByDateEarliest(dataArr) {
  function compare(a, b) {
    const aTime = new Date(`${a.date} ${a.time}`);
    const bTime = new Date(`${b.date} ${b.time}`);

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

export function sortByDateEarliestX(dataArr) {
  function compare(a, b) {
    const aTime = new Date(`${a[0].events.date} ${a[0].events.time}`);
    const bTime = new Date(`${b[0].events.date} ${b[0].events.time}`);

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

export function sortByDateLatestX(dataArr) {
  function compare(a, b) {
    const aTime = new Date(`${a[0].events.date} ${a[0].events.time}`);
    const bTime = new Date(`${b[0].events.date} ${b[0].events.time}`);

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

export function sortByDateEarliestAlt(dataArr) {
  function compare(a, b) {
    const aTime = new Date(`${a.events.date} ${a.events.time}`);
    const bTime = new Date(`${b.events.date} ${b.events.time}`);

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

export function minsPerDemographic(dataArr, category) {
  if (dataArr.length == 0) {
    return null;
  }
  const output = [];

  if (category == "gender") {
    let maleMins = 0;
    let femaleMins = 0;
    let othersMins = 0;

    for (let i = 0; i < dataArr.length; i++) {
      switch (dataArr[i].users.gender) {
        case "Male":
          maleMins += dataArr[i].events.duration;
          break;
        case "Female":
          femaleMins += dataArr[i].events.duration;
          break;
        case "Others":
          othersMins += dataArr[i].events.duration;
          break;
      }
    }

    createAndPush("Male", maleMins);
    createAndPush("Female", femaleMins);
    createAndPush("Others", othersMins);
  } else if (category == "occupation") {
    let employedMins = 0;
    let unemployedMins = 0;
    let studentMins = 0;
    let othersMins = 0;

    for (let i = 0; i < dataArr.length; i++) {
      switch (dataArr[i].users.occupation) {
        case "Employed":
          employedMins += dataArr[i].events.duration;
          break;
        case "Unemployed":
          unemployedMins += dataArr[i].events.duration;
          break;
        case "Student":
          studentMins += dataArr[i].events.duration;
          break;
        case "Others":
          othersMins += dataArr[i].events.duration;
          break;
      }
    }

    createAndPush("Employed", employedMins);
    createAndPush("Unemployed", unemployedMins);
    createAndPush("Student", studentMins);
    createAndPush("Others", othersMins);
  } else if (category == "immigration") {
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    let e = 0;
    let f = 0;

    for (let i = 0; i < dataArr.length; i++) {
      switch (dataArr[i].users.immigration) {
        case "Singapore Citizen":
          a += dataArr[i].events.duration;
          break;
        case "Singapore PR":
          b += dataArr[i].events.duration;
          break;
        case "Student Pass":
          c += dataArr[i].events.duration;
          break;
        case "Work Pass":
          d += dataArr[i].events.duration;
          break;
        case "Foreigner":
          e += dataArr[i].events.duration;
          break;
        default:
          f += dataArr[i].events.duration;
          break;
      }
    }

    createAndPush("Singapore Citizen", a);
    createAndPush("Singapore PR", b);
    createAndPush("Student Pass", c);
    createAndPush("Work Pass", d);
    createAndPush("Foreigner", e);
    createAndPush("Others", f);
  }

  return output;

  function createAndPush(name, uv) {
    let obj = {};
    obj.name = name;
    obj.minutes = uv;
    output.push(obj);
  }
}

// generate excel sheet
export const generateExcel = (data, sheetName = "Sheet 1") => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  return blob;
};

// clean data to add to excel sheet
export const cleanDataForExcel = (dataArr) => {
  // Flatten the nested arrays into a single array
  const flattenedData = dataArr.map((res) => {
    const data = res[0];
    return {
      remarks: data?.remarks,
      attended: data?.attended,
      finished: data?.finished,
      volunteer_id: data?.volunteer_id,
      event_id: data?.event_id,
      eventName: data?.events?.name,
      eventDate: data?.events?.date,
      eventTime: data?.events?.time,
      userFirstName: data?.users?.first_name,
      userLastName: data?.users?.last_name,
    };
  });

  // Extract the headers from the first object
  const headers = Object.keys(flattenedData[0]);

  // // Create an array of arrays containing header and data rows
  const excelData = [
    headers,
    ...flattenedData.map((obj) => Object.values(obj)),
  ];

  return excelData;
};

export function countInterests(dataArr) {
  function locateObject(name) {
    for (let i = 0; i < result.length; i++) {
      if (result[i].name == name) {
        return i;
      }
    }
    return -1;
  }

  function createObject(name, count) {
    let obj = {};
    obj.name = name;
    obj.count = count;
    return obj;
  }

  let result = [];
  for (let i = 0; i < dataArr.length; i++) {
    for (let j = 0; j < dataArr[i].length; j++) {
      if (locateObject(dataArr[i][j]) == -1) {
        result.push(createObject(dataArr[i][j], 1));
      } else {
        result[locateObject(dataArr[i][j])].count += 1;
      }
    }
  }

  result.sort(function (o1, o2) {
    return o2.count - o1.count;
  });
  return result;
}
