import { RootState } from "@/app/globalRedux/store";

export const wrapAccessoriesFilter = (
  { minPrice, maxPrice, ...filters }: RootState["accessories"]["filters"],
  page: number
) => {
  const shouldArray = [
    "brand",
    "model",
    "color",
    "diameter",
    "load_index",
    "width",
  ];
  const price =
    minPrice !== undefined || maxPrice !== undefined
      ? {
          ...(minPrice !== undefined && {
            minPrice: parseInt(minPrice.toString(), 10),
          }),
          ...(maxPrice !== undefined && {
            maxPrice: parseInt(maxPrice.toString(), 10),
          }),
        }
      : {};

  const obj: Record<string, string[] | number[] | string | number | object> =
    {};

  Object.entries(filters).forEach(function ([key, value]) {
    if (
      shouldArray.includes(key) &&
      key !== "sort" &&
      typeof value !== "object"
    ) {
      obj[key] = value.split(",").map((brand: string) => brand.trim());
    } else if (key === "sort" && typeof value === "string") {
      obj[key] = [
        {
          whom: value.split(",")[0],
          order: value.split(",")[1],
        },
      ];
    } else {
      obj[key] = value;
    }
  });

  return {
    sort: [
      {
        whom: "msrp",
        order: "desc",
      },
    ],
    ...obj,
    ...price,
    page,
    category: "accessories",

    size: 12,
  };
};
