"use client";

import { TPriceFilter } from "@/app/types/filter";
import MultiRangeSlider from "@/app/ui/multi-range-slider/multi-range-slider";
import { useState } from "react";
import FilterHeading from "../../template/filter-heading";

const PriceRange = ({ price }: { price: TPriceFilter }) => {
  // const { filters, toggleFilterValue } = useFilter()

  const [minPrice, setMinPrice] = useState(price.min);
  const [maxPrice, setMaxPrice] = useState(price.max);

  const [currentLowPrice, setCurrentLowPrice] = useState(price.min);
  const [currentHighPrice, setCurrentHighPrice] = useState(price.max);
  const [showFilter, setshowFilter] = useState(true);

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };

  const getMinMax = ({
    min,
    max,
    currentLow,
    currentHigh,
  }: {
    min: number;
    max: number;
    currentLow: number;
    currentHigh: number;
  }) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentLowPrice(currentLow);
    setCurrentHighPrice(currentHigh);
  };

  const onClick = () => {
    // toggleFilterValue("minPrice", currentLowPrice.toString(), false)
    // toggleFilterValue("maxPrice", currentHighPrice.toString(), false)
    console.log("currentLowPrice = ", currentLowPrice);
    console.log("currentHighPrice = ", currentHighPrice);
  };

  if (maxPrice === minPrice) {
    return <></>;
  }

  return (
    <div className="px-5 py-3 border-y">
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Price Range"
      />
      {showFilter && (
        <div className="mt-3">
          <MultiRangeSlider
            min={minPrice}
            max={maxPrice}
            currentLow={currentLowPrice}
            currentHigh={currentHighPrice}
            onChange={getMinMax}
          />
          <div>
            <button onClick={onClick} className={"box-button mt-3"}>
              Filter Price
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRange;
