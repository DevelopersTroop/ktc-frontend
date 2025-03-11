"use client";

import { ActionFilter } from "@/components/shared/action-filter";
import { useFetchFilters } from "@/hooks/useFetchFilters";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import PriceRange from "./widgets/price-range";
import WheelDiameter from "./widgets/wheels/wheel-diameter";
import WheelFinish from "./widgets/wheels/wheel-finish";
import WheelModel from "./widgets/wheels/wheel-model";

const WheelFilters = React.memo(() => {
  const { filters } = useFetchFilters("wheels");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchKey, setSearchKey] = useState(query);
  useSearchFilter(searchKey, setSearchKey, query);

  return (
    <div className={"filter-shadow bg-gray-200"}>
      <ActionFilter />
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
