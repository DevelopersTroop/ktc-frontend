"use client";

import { TSingleFilter } from "@/types/filter";
import AccessoriesBrand from "./widgets/accessories/accessories-brand";
import AccessoriesSearchByKey from "./widgets/accessories/accessories-search-by-key";
import AccessoriesSubCategory from "./widgets/accessories/accessories-subcategory";

const subCategory: TSingleFilter[] = [
  { value: "Leveling Kits", count: 12 },
  { value: "Load Support", count: 18 },
  { value: "Lift Kits", count: 22 },
  { value: "Lowering Kits", count: 28 },
  { value: "Air Suspension", count: 35 },
  { value: "Coil Springs", count: 7 },
  { value: "Leaf Springs", count: 10 },
  { value: "Shocks & Struts", count: 15 },
  { value: "Suspension Bushings", count: 9 },
  { value: "Control Arms", count: 5 },
  { value: "Sway Bars", count: 11 },
  { value: "Ball Joints", count: 3 },
  { value: "Tie Rods", count: 2 },
  { value: "Wheel Spacers", count: 6 },
  { value: "Suspension Kits", count: 8 },
];

const brand: TSingleFilter[] = [
  { value: "aFe Power", count: 12 },
  { value: "Air Lift", count: 18 },
  { value: "Apex Chasis", count: 22 },
  { value: "Bilstein", count: 28 },
  { value: "Eibach", count: 35 },
  { value: "Fox", count: 7 },
  { value: "ICON Vehicle Dynamics", count: 10 },
  { value: "King Shocks", count: 15 },
  { value: "KYB", count: 9 },
  { value: "Monroe", count: 5 },
  { value: "Pro Comp", count: 11 },
  { value: "Rancho", count: 3 },
  { value: "Skyjacker", count: 2 },
  { value: "Superlift", count: 6 },
  { value: "TeraFlex", count: 8 },
];

const handleSearch = (key: string) => {
  console.log("Searching for:", key);
};

const AccessoriesFilters = () => {
  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div
        className={
          "flex justify-between text-lg font-medium text-gray-800 px-5 py-3 border-b border-gray-300 bg-gray-100 md:bg-transparent md:static sticky top-7 z-40"
        }
      >
        <p>Action Filter</p>
        <p className="text-sm text-primary cursor-pointer hidden md:block">
          Clear filter
        </p>
      </div>

      <div className={"px-5 py-3 border-y border-gray-300"}>
        <AccessoriesSubCategory
          filterKey={"accessories-subcategory"}
          subCategory={subCategory}
        />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <AccessoriesBrand filterKey={"accessories-brand"} brand={brand} />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <AccessoriesSearchByKey onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default AccessoriesFilters;
