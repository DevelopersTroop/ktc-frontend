"use client";

import MultiRangeSlider from "@/app/ui/multi-range-slider/multi-range-slider";
import { TPriceFilter } from "@/types/filter";
import debounce from "debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFilterSync } from "../store";
import FilterHeading from "../template/filter-heading";

const PriceRange = ({ price }: { price?: TPriceFilter }) => {
  const { filters, toggleFilterValue } = useFilterSync();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);

  const minPriceRef = useRef(price?.min || 0);
  const maxPriceRef = useRef(price?.max || 0);
  const currentLowPriceRef = useRef(
    Number(filters.minPrice) ||
      Number(searchParams.get("minPrice")) ||
      price?.min ||
      0,
  );
  const currentHighPriceRef = useRef(
    Number(filters.maxPrice) ||
      Number(searchParams.get("maxPrice")) ||
      price?.max ||
      0,
  );

  const createQueryString = useCallback(
    (minPrice: number, maxPrice: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (minPrice !== price?.min) {
        params.set("minPrice", String(minPrice));
      } else {
        params.delete("minPrice");
      }
      if (maxPrice !== price?.max) {
        params.set("maxPrice", String(maxPrice));
      } else {
        params.delete("maxPrice");
      }
      return params.toString();
    },
    [searchParams, price?.min, price?.max],
  );

  const debouncedUpdate = useRef(
    debounce((minPrice: number, maxPrice: number) => {
      const queryString = createQueryString(minPrice, maxPrice);
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
      toggleFilterValue("minPrice", String(minPrice), false);
      toggleFilterValue("maxPrice", String(maxPrice), false);
    }, 500),
  ).current;

  const toggleFilter = () => setShowFilter((prev) => !prev);

  const getMinMax = useCallback(
    ({
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
      if (min !== minPriceRef.current || max !== maxPriceRef.current) {
        minPriceRef.current = min;
        maxPriceRef.current = max;
      }

      if (
        currentLow !== currentLowPriceRef.current ||
        currentHigh !== currentHighPriceRef.current
      ) {
        currentLowPriceRef.current = currentLow;
        currentHighPriceRef.current = currentHigh;
      }
    },
    [],
  );

  const applyFilter = () => {
    debouncedUpdate(currentLowPriceRef.current, currentHighPriceRef.current);
  };

  useEffect(() => {
    if (price) {
      minPriceRef.current = price.min;
      maxPriceRef.current = price.max;
    }
  }, [price]);

  // if (maxPriceRef.current === minPriceRef.current) return null;

  return (
    <div className="border-y px-5 py-3">
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Price Range"
      />
      {showFilter && (
        <div className="mt-3">
          <MultiRangeSlider
            min={minPriceRef.current}
            max={maxPriceRef.current}
            currentLow={currentLowPriceRef.current}
            currentHigh={currentHighPriceRef.current}
            onChange={getMinMax}
          />
          <div className="mt-3">
            <button onClick={applyFilter} className="box-button">
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRange;
