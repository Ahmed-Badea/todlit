export const formatDate = (date: Date | string) => {
  if (date instanceof Date) {
    const offsetDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return offsetDate.toISOString().slice(0, 10);
  }
  return date;
};
