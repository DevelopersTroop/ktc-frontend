"use client";

import { TSingleFilter } from "@/app/types/filter";
import WheelDiameter from "./widgets/wheels/wheel-diameter";
import WheelFinish from "./widgets/wheels/wheel-finish";
import WheelModel from "./widgets/wheels/wheel-model";
import PriceRange from "./widgets/wheels/wheel-price-range";
import { useAppDispatch } from "@/app/globalRedux/store";

const diameter: TSingleFilter[] = [
  { value: 14, count: 10 },
  { value: 15, count: 15 },
  { value: 16, count: 20 },
  { value: 17, count: 25 },
  { value: 18, count: 30 },
  { value: 19, count: 5 },
  { value: 20, count: 8 },
  { value: 21, count: 12 },
  { value: 22, count: 7 },
  { value: 23, count: 3 },
  { value: 24, count: 9 },
  { value: 26, count: 2 },
  { value: 28, count: 1 },
  { value: 30, count: 4 },
  { value: 32, count: 6 },
  { value: 34, count: 11 },
  { value: 36, count: 13 },
  { value: 38, count: 14 },
  { value: 40, count: 16 },
  { value: 42, count: 18 },
  { value: 44, count: 19 },
  { value: 46, count: 21 },
  { value: 48, count: 22 },
  { value: 50, count: 24 },
  { value: 52, count: 26 },
  { value: 54, count: 27 },
];

const model: TSingleFilter[] = [
  { value: "Allora", count: 12 },
  { value: "Bario", count: 8 },
  { value: "Mira", count: 15 },
  { value: "Napoliano", count: 5 },
  { value: "Sorleno", count: 10 },
];

const finish: TSingleFilter[] = [
  { value: "Gloss Black", count: 10 },
  { value: "Matte Black", count: 15 },
  { value: "Silver", count: 20 },
  { value: "Gunmetal", count: 25 },
  { value: "Bronze", count: 30 },
  { value: "Gold", count: 5 },
  { value: "Chrome", count: 8 },
  { value: "Brushed", count: 12 },
  { value: "Polished", count: 7 },
  { value: "Red", count: 3 },
  { value: "Blue", count: 9 },
  { value: "White", count: 2 },
  { value: "Yellow", count: 1 },
  { value: "Green", count: 4 },
  { value: "Orange", count: 6 },
  { value: "Purple", count: 11 },
  { value: "Pink", count: 13 },
  { value: "Copper", count: 14 },
  { value: "Bronze", count: 16 },
  { value: "Gold", count: 18 },
  { value: "Silver", count: 19 },
  { value: "Black", count: 21 },
];

const priceRange = {
  min: 100,
  max: 5000,
};

const WheelFilters = () => {
  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div
        className={
          "flex justify-between text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors px-5 py-3 border-b border-gray-300 bg-gray-100 md:bg-transparent md:static sticky top-7 z-40"
        }
      >
        <p>Action Filter</p>
        <p className="text-sm text-primary cursor-pointer hidden md:block">
          Clear filter
        </p>
      </div>
      <div>
        <PriceRange price={priceRange} />
      </div>
      <div className={"px-5 py-3 border-y border-gray-300"}>
        <WheelDiameter filterKey={"wheel_diameter"} diameter={diameter} />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <WheelModel filterKey={"model_group"} model={model} />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <WheelFinish filterKey={"finish"} finish={finish} />
      </div>
    </div>
  );
};

export default WheelFilters;
