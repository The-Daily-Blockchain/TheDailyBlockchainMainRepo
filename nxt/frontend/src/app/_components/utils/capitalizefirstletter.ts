export const capitalizeFirstLetter = (str: string) => {
  return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};
