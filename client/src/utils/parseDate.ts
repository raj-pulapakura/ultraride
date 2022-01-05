export const parseDate = (dateInNumberFormat: number) => {
  const rawDate = new Date(dateInNumberFormat);
  return `${rawDate.getDate()}/${
    rawDate.getMonth() + 1
  }/${rawDate.getFullYear()}`;
};
