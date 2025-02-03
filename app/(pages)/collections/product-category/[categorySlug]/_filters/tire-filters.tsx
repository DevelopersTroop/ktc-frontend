"use client";

import { TSingleFilter } from "@/app/types/filter";
import TireBrand from "./widgets/tire/tire-brand";
import TireHeight from "./widgets/tire/tire-height";
import TireImage from "./widgets/tire/tire-image";
import TireLoadIndex from "./widgets/tire/tire-load-index";
import TireLoadRange from "./widgets/tire/tire-load-range";
import TireModel from "./widgets/tire/tire-model";
import TirePriceRange from "./widgets/tire/tire-price-range";
import TireType from "./widgets/tire/tire-type";
import TireWheelDiameter from "./widgets/tire/tire-wheel-diameter";
import TireWidth from "./widgets/tire/tire-width";

const diameter: TSingleFilter[] = [
  { value: '14.5"', count: 10 },
  { value: "15", count: 15 },
  { value: "16", count: 20 },
  { value: "17", count: 25 },
  { value: "18", count: 30 },
  { value: "19", count: 5 },
  { value: "20", count: 8 },
  { value: "21", count: 12 },
  { value: "22", count: 7 },
  { value: "23", count: 3 },
  { value: "24", count: 9 },
  { value: "26", count: 2 },
  { value: "28", count: 1 },
  { value: "30", count: 4 },
  { value: "32", count: 6 },
  { value: "34", count: 11 },
  { value: "36", count: 13 },
  { value: "38", count: 14 },
  { value: "40", count: 16 },
  { value: "42", count: 18 },
  { value: "44", count: 19 },
  { value: "46", count: 21 },
  { value: "48", count: 22 },
  { value: "50", count: 24 },
  { value: "52", count: 26 },
  { value: "54", count: 27 },
];

const height: TSingleFilter[] = [
  { value: '11.5"', count: 5 },
  { value: '12.5"', count: 10 },
  { value: '13.5"', count: 15 },
  { value: '14.5"', count: 20 },
  { value: '15.5"', count: 25 },
  { value: '16.5"', count: 30 },
  { value: '17.5"', count: 35 },
  { value: '18.5"', count: 40 },
  { value: '19.5"', count: 45 },
  { value: '20.5"', count: 50 },
  { value: '21.5"', count: 55 },
  { value: '22.5"', count: 60 },
  { value: '23.5"', count: 65 },
  { value: '24.5"', count: 70 },
  { value: '25.5"', count: 75 },
  { value: '26.5"', count: 80 },
  { value: '27.5"', count: 85 },
  { value: '28.5"', count: 90 },
  { value: '29.5"', count: 95 },
  { value: '30.5"', count: 100 },
];

const width: TSingleFilter[] = [
  { value: '4"', count: 5 },
  { value: '4.5"', count: 10 },
  { value: '5"', count: 15 },
  { value: '5.5"', count: 20 },
  { value: '6"', count: 25 },
  { value: '6.5"', count: 30 },
  { value: '7"', count: 35 },
  { value: '7.5"', count: 40 },
  { value: '8"', count: 45 },
  { value: '8.5"', count: 50 },
  { value: '9"', count: 55 },
  { value: '9.5"', count: 60 },
];

const tireType: TSingleFilter[] = [
  { value: "ATV", count: 10 },
  { value: "All Season", count: 20 },
  { value: "All Terrain", count: 15 },
  { value: "Commercial", count: 5 },
  { value: "Mud Terrain", count: 8 },
  { value: "Performance", count: 12 },
  { value: "Touring", count: 7 },
  { value: "Winter", count: 3 },
  { value: "Highway", count: 10 },
  { value: "Off-Road", count: 20 },
  { value: "Mud", count: 15 },
  { value: "Sand", count: 5 },
  { value: "Snow", count: 8 },
  { value: "Rock", count: 12 },
  { value: "Gravel", count: 7 },
  { value: "Grass", count: 3 },
];

const loadRange: TSingleFilter[] = [
  { value: "B", count: 10 },
  { value: "C", count: 15 },
  { value: "D", count: 20 },
  { value: "E", count: 25 },
  { value: "F", count: 30 },
  { value: "G", count: 35 },
  { value: "H", count: 40 },
  { value: "LL", count: 45 },
  { value: "RE", count: 50 },
  { value: "M", count: 55 },
];

const loadIndex: TSingleFilter[] = [
  { value: "100", count: 10 },
  { value: "101", count: 15 },
  { value: "102", count: 20 },
  { value: "103", count: 25 },
  { value: "104", count: 30 },
  { value: "105", count: 35 },
  { value: "106", count: 40 },
  { value: "107", count: 45 },
  { value: "108", count: 50 },
  { value: "109", count: 55 },
  { value: "110", count: 60 },
  { value: "111", count: 65 },
];

const brand: TSingleFilter[] = [
  { value: "EFX", count: 10 },
  { value: "Toyo", count: 15 },
];

const model: TSingleFilter[] = [
  { value: "Allora", count: 12 },
  { value: "Bario", count: 8 },
  { value: "Mira", count: 15 },
  { value: "Napoliano", count: 5 },
  { value: "Sorleno", count: 10 },
];

const priceRange = {
  min: 100,
  max: 5000,
};

const TireFilters = () => {
  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div className="border-b border-gray-300">
        <TireImage />
      </div>
      <div className="px-3 pt-10 pb-3 border-b border-gray-300">
        <div className="relative outline outline-1 p-1">
          <h2 className="uppercase font-semibold text-base pt-3">
            Not A pro at this?
          </h2>
          <p>
            Use the tire guided flow to get step-by-step support, and we'll get
            you exactly the tires your build needs.
          </p>
          <div className="text-center mt-3">
            <button className="uppercase py-1.5 px-10 bg-primary text-center text-white mx-auto">
              Get Guided
            </button>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 px-3">
            <h2 className="uppercase text-lg font-semibold">Never Fail</h2>
          </div>
        </div>
      </div>
      <div
        className={
          "flex justify-between text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors px-5 py-3 border-y border-gray-300 bg-gray-100 md:bg-transparent md:static sticky top-7 z-40"
        }
      >
        <p>Action Filter</p>
        <p className="text-sm text-primary cursor-pointer hidden md:block">
          Clear filter
        </p>
      </div>
      <div>
        <TirePriceRange price={priceRange} />
      </div>
      <div className={"px-5 py-3 border-y border-gray-300"}>
        <TireWheelDiameter filterKey={"wheel_diameter"} diameter={diameter} />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <TireHeight filterKey={"tire_height"} height={height} />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <TireWidth filterKey={"tire_width"} width={width} />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <TireType filterKey={"tire_type"} tireType={tireType} />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <TireLoadRange filterKey={"tire_loadRange"} loadRange={loadRange} />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <TireLoadIndex filterKey={"tire_LoadIndex"} loadIndex={loadIndex} />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <TireBrand filterKey={"brand"} brand={brand} />
      </div>
      <div className={"px-5 py-3 border-b border-gray-300"}>
        <TireModel filterKey={"model_group"} model={model} />
      </div>
    </div>
  );
};

export default TireFilters;
