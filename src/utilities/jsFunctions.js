export const isValidName = (val) => {
  if (val.includes(" ")) {
    const parts = val.split(" ");
    if (parts.length === 2) {
      const part1 = parts[0];
      const part2 = parts[1];
      const isAlphabetic =
        /^[A-Za-z]+$/.test(part1) && /^[A-Za-z]+$/.test(part2);
      return isAlphabetic;
    }
  }
  return false;
};

export const isValidPhoneNumber = (val) => {
  const format1 = /^\d{3}-\d{3}-\d{4}$/;
  const format2 = /^\(\d{3}\) \d{3}-\d{4}$/;
  const format3 = /^\d{10}$/;
  const format4 = /^\(\d{3}\)\d{3}-\d{4}$/;
  return (
    format1.test(val) ||
    format2.test(val) ||
    format3.test(val) ||
    format4.test(val)
  );
};

export const dateFormat = (val) => {
  const dateParts = val.split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formattedMonth = monthNames[parseInt(month) - 1];
  const formattedDate = `${formattedMonth} ${parseInt(day)}, ${year}`;
  return formattedDate;
};

export const timeFormat = (val) => {
  const timeParts = val.split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const period = hours < 12 ? "am" : "pm";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedTime = `${formattedHours}:${formattedMinutes}${period}`;

  return formattedTime;
};

// export const sortConcertsByDate = (concerts) => {
//   return Object.entries(concerts)
//     .map(([id, concert]) => ({ id, concert }))
//     .sort((a, b) => {
//       const dateA = new Date(a.concert.date);
//       const dateB = new Date(b.concert.date);
//       return dateA - dateB;
//     })
//     .map((item) => item.concert);
// };

export const sortConcertsByDate = (concerts) => {
  return [...concerts].sort(
    (a, b) => new Date(a[1].date) - new Date(b[1].date)
  );
};
