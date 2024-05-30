export function formatToUSD(value: number): string {
  // Handle special cases
  if (value === null || value === undefined) {
    return "";
  }

  // Determine if value is in thousands
  let formattedValue: string;
  if (value >= 1000) {
    formattedValue = (value / 1000).toFixed(1) + "k";
  } else {
    formattedValue = value.toString();
  }

  // Convert to USD format
  const usdValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(formattedValue.replace("k", "")));

  // Append 'k' if needed
  if (formattedValue.endsWith("k")) {
    return usdValue.replace("$", "$") + "k";
  } else {
    return usdValue;
  }
}
