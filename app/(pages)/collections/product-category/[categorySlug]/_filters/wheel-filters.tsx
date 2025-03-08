"use client";

import { useFetchFilters } from "@/hooks/useFetchFilters";
import React from "react";
import PriceRange from "./widgets/price-range";
import WheelDiameter from "./widgets/wheels/wheel-diameter";
import WheelFinish from "./widgets/wheels/wheel-finish";
import WheelModel from "./widgets/wheels/wheel-model";

const WheelFilters = React.memo(() => {
  const { filters } = useFetchFilters("wheels");
  console.log(filters);
  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div
        className={
          "sticky top-7 z-40 flex justify-between border-b border-gray-300 bg-gray-100 px-5 py-3 text-lg font-medium text-gray-900 transition-colors hover:text-gray-600 md:static md:bg-transparent"
        }
      >
        <p>Action Filter</p>
        <p className="hidden cursor-pointer text-sm text-primary hover:text-primary-hover md:block">
          Clear filter
        </p>
      </div>
      <div>
        <PriceRange price={filters?.price} />
      </div>
      <div className={"border-y border-gray-300 px-5 py-3"}>
        <WheelDiameter
          filterKey={"diameter"}
          diameter={filters?.diameter || []}
        />
      </div>
      <div className={"border-b border-gray-300 px-5 py-3"}>
        <WheelModel filterKey={"model"} model={filters?.model || []} />
      </div>
      <div className={"border-b border-gray-300 px-5 py-3"}>
        <WheelFinish filterKey={"color"} finish={filters?.color || []} />
      </div>
    </div>
  );
});

WheelFilters.displayName = "WheelFilters";
export default WheelFilters;
