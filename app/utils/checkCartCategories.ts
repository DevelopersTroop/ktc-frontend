export const checkCartCategories = (products: any[]) => {
  // if (!Array.isArray(products) || products?.length === 0) {
  //   return "MIXED";
  // }

  // const categories = products?.map((product) => product?.category?.toLowerCase());
  // const uniqueCategories = [...new Set(categories)];

  // const hasCategory = (pattern: string) =>
  //   uniqueCategories?.some((cat) => cat?.includes(pattern.toLowerCase()));

  // if (uniqueCategories?.every((cat) => cat?.includes("steering"))) {
  //   return "STEERING_WHEEL_ONLY";
  // }

  // if (
  //   uniqueCategories.every(
  //     (cat) => cat?.includes("in-stock") || cat?.includes("instock")
  //   )
  // ) {
  //   return "IN_STOCK_ONLY";
  // }

  // if (
  //   uniqueCategories.every(
  //     (cat) => cat?.includes("center") && cat?.includes("cap")
  //   )
  // ) {
  //   return "CENTER_CAP_ONLY";
  // }

  // if (
  //   uniqueCategories?.length === 2 &&
  //   hasCategory("tire") &&
  //   hasCategory("in-stock")
  // ) {
  //   return "IN_STOCK_AND_TIRE";
  // }

  // if (uniqueCategories.every((cat) => cat?.includes("custom"))) {
  //   return "CUSTOM_WHEELS_ONLY";
  // }

  return "MIXED";
};
