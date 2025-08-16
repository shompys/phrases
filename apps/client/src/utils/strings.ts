export const capitalizeFirstLetter = (str: string) => {
  const lowerCaseStr = str.toLowerCase();

  return lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);
};
