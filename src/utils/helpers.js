export const formatPrice = (number) => {
  const newNum = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNum;
};

export const getUniqueValues = (data, prop) => {
  if (prop === "colors") {
    return [
      "all",
      ...new Set(
        data
          .map((ele) => ele[prop])
          .flat()
          .filter((e) => e)
      ),
    ];
  }
  if (prop === "price") {
    return [...new Set(data.map((ele) => ele[prop]))];
  }
  return ["all", ...new Set(data.map((ele) => ele[prop]).filter((e) => e))];
};
