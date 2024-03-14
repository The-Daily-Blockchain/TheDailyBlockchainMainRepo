export const formatAmount = (amount: any): any => {
  return amount?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
export const newFormatAmount = (amount: number | string): string => {
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatNumberWithCommas = (number: any) => {
  return number.toLocaleString();
};
