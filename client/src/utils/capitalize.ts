export const capitalize = (text: string) => {
  const textLower = text.toLowerCase();
  return textLower[0].toUpperCase() + textLower.slice(1);
};
