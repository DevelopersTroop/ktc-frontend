"use client";

import { TSingleFilter } from "@/types/filter";
import GalleryTireHeight from "./widgets/gallery-tire-height";
import GalleryTireWidth from "./widgets/gallery-tire-width";
import GalleryTypeOfStance from "./widgets/gallery-type-of-stance";
import GalleryWheelDiameter from "./widgets/gallery-wheel-diameter";
import GalleryWheelOffset from "./widgets/gallery-wheel-offset";
import GalleryWheelWidth from "./widgets/gallery-wheel-width";
import SuspensionBrand from "./widgets/suspension-brand";

const suspensionBrand: TSingleFilter[] = [
  { value: "OEM", count: 10 },
  { value: "Pro Comp", count: 15 },
  { value: "Rough Country", count: 20 },
];

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

const wheelWidth: TSingleFilter[] = [
  { value: '10"', count: 15 },
  { value: '11"', count: 20 },
  { value: '12"', count: 25 },
];

const tireHeight: TSingleFilter[] = [
  { value: '31"', count: 10 },
  { value: '33"', count: 15 },
  { value: '35"', count: 20 },
  { value: '37"', count: 25 },
  { value: '40"', count: 30 },
];

const tireWidth: TSingleFilter[] = [
  { value: '10.5"', count: 12 },
  { value: '12.5"', count: 18 },
];

const wheelOffset: TSingleFilter[] = [
  { value: "-24mm", count: 10 },
  { value: "-18mm", count: 15 },
  { value: "-12mm", count: 20 },
  { value: "-6mm", count: 25 },
];

const typeOfStance: TSingleFilter[] = [
  { value: 'Aggressive > 1" outside fender', count: 10 },
  { value: "Slightly Aggressive", count: 15 },
];

const GalleryFilters = () => {
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

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <SuspensionBrand
          filterKey={"suspension_brand"}
          suspensionBrand={suspensionBrand}
        />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryWheelDiameter
          filterKey={"wheel_diameter"}
          diameter={diameter}
        />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryWheelWidth filterKey={"wheel_width"} wheelWidth={wheelWidth} />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryTireHeight filterKey={"tire_height"} tireHeight={tireHeight} />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryTireWidth filterKey={"tire_width"} tireWidth={tireWidth} />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryWheelOffset
          filterKey={"wheel_offset"}
          wheelOffset={wheelOffset}
        />
      </div>

      <div className={"px-5 py-3 border-b border-gray-300"}>
        <GalleryTypeOfStance
          filterKey={"type_of_stance"}
          typeOfStance={typeOfStance}
        />
      </div>
    </div>
  );
};

export default GalleryFilters;
