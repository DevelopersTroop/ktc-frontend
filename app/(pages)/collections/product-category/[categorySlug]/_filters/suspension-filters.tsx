"use client";

import { TSingleFilter } from "@/types/filter";
import SuspensionBrand from "./widgets/suspension/suspension-brand";
import SuspensionLiftSize from "./widgets/suspension/suspension-lift-size";
import SuspensionPriceRange from "./widgets/suspension/suspension-price-range";
import SuspensionSubCategory from "./widgets/suspension/suspension-subcategory";

const subCategory: TSingleFilter[] = [
  { value: "Leveling Kits", count: 10 },
  { value: "Load Support", count: 15 },
  { value: "Lift Kits", count: 20 },
  { value: "Lowering Kits", count: 25 },
  { value: "Air Suspension", count: 30 },
  { value: "Coil Springs", count: 5 },
  { value: "Leaf Springs", count: 8 },
  { value: "Shocks & Struts", count: 12 },
  { value: "Suspension Bushings", count: 7 },
  { value: "Control Arms", count: 3 },
  { value: "Sway Bars", count: 9 },
  { value: "Ball Joints", count: 2 },
  { value: "Tie Rods", count: 1 },
  { value: "Wheel Spacers", count: 4 },
  { value: "Suspension Kits", count: 6 },
];

const liftSize: TSingleFilter[] = [
  { value: '0"-1"', count: 5 },
  { value: '1"-2"', count: 8 },
  { value: '2"-3"', count: 12 },
  { value: '3"-4"', count: 7 },
  { value: '4"-5"', count: 10 },
];

const brand: TSingleFilter[] = [
  { value: "aFe Power", count: 10 },
  { value: "Air Lift", count: 15 },
  { value: "Apex Chasis", count: 20 },
  { value: "Bilstein", count: 25 },
  { value: "Eibach", count: 30 },
  { value: "Fox", count: 5 },
  { value: "ICON Vehicle Dynamics", count: 8 },
  { value: "King Shocks", count: 12 },
  { value: "KYB", count: 7 },
  { value: "Monroe", count: 3 },
  { value: "Pro Comp", count: 9 },
  { value: "Rancho", count: 2 },
  { value: "Skyjacker", count: 1 },
  { value: "Superlift", count: 4 },
  { value: "TeraFlex", count: 6 },
];

const priceRange = {
  min: 100,
  max: 5000,
};

const SuspensionFilters = () => {
  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div
        className={
          "flex justify-between text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors px-5 py-3 border-b border-gray-300 bg-gray-100 md:bg-transparent md:static sticky top-7 z-40"
        }
      >
        <p>Action Filter</p>
        <p className="text-sm text-primary hover:text-primary-hover cursor-pointer hidden md:block">
          Clear filter
        </p>
      </div>
      <div>
        <SuspensionPriceRange price={priceRange} />
      </div>
      <div className={"px-5 py-3 border-y border-gray-300"}>
        <SuspensionSubCategory
          filterKey={"suspension-subcategory"}
          subCategory={subCategory}
        />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <SuspensionLiftSize
          filterKey={"suspension-lift-size"}
          liftSize={liftSize}
        />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <SuspensionBrand filterKey={"suspension-brand"} brand={brand} />
      </div>
    </div>
  );
};

export default SuspensionFilters;
