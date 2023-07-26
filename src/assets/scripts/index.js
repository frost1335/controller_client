export const formatter = new Intl.NumberFormat("uz-UZ", {
  style: "currency",
  currency: "UZS",
  maximumFractionDigits: 2,
});

export const textSub = (text, subNum) => {
  if (text) {
    return text?.length >= subNum ? `${text?.substring(0, subNum)}...` : text;
  } else {
    return "";
  }
};
