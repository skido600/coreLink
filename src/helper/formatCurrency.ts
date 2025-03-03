// utils/formatCurrency.ts
export const formatCurrency = (value: string | number) => {
  const numberValue =
    typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
  return numberValue.toLocaleString("en-US");
};
