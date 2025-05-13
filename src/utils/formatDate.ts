export const formatDate = (date: Date | string) => {
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
