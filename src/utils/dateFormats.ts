export const fullDateFormat = (date: Date | string) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  if (date instanceof Date && !isNaN(date.getTime())) {
    const offsetDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return offsetDate.toISOString().slice(0, 10);
  }

  return date; // Returns unchanged if the string can't be converted to a valid Date
};

export const dateOnlyFormat = (date: Date | string): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  if (date instanceof Date && !isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // zero-padded
    const day = String(date.getDate()).padStart(2, "0"); // zero-padded
    return `${year}-${month}-${day}`;
  }

  return ""; // fallback for invalid dates
};


