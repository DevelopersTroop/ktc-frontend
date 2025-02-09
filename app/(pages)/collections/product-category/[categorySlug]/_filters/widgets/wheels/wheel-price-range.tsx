"use client";

import { TPriceFilter } from "@/app/types/filter";
import MultiRangeSlider from "@/app/ui/multi-range-slider/multi-range-slider";
import debounce from "debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import useFilterSync from "../../store";
import FilterHeading from "../../template/filter-heading";

const PriceRange = ({ price }: { price: TPriceFilter }) => {
  const { filters, toggleFilterValue } = useFilterSync()
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(true);
  const minPriceRef = useRef(price.min);
  const maxPriceRef = useRef(price.max);
  const currentLowPriceRef = useRef(Number(filters.minPrice) || searchParams.get('minPrice') || price.min);
  const currentHighPriceRef = useRef(Number(filters.maxPrice) || searchParams.get('maxPrice') || price.max);

  const createQueryString = useCallback(
    (minPrice: number, maxPrice: number) => {
      const params = new URLSearchParams(searchParams.toString());
      minPrice !== price.min ? params.set("minPrice", String(minPrice)) : params.delete("minPrice");
      maxPrice !== price.max ? params.set("maxPrice", String(maxPrice)) : params.delete("maxPrice");
      return params.toString();
    },
    [searchParams, price.min, price.max]
  );

  const debouncedUpdate = useRef(
    debounce((minPrice: number, maxPrice: number) => {
      const queryString = createQueryString(minPrice, maxPrice);
      if (minPrice !== price.min || maxPrice !== price.max) {
        router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
      }
      toggleFilterValue("minPrice", String(minPrice), false);
      toggleFilterValue("maxPrice", String(maxPrice), false);
    }, 500)
  ).current;

  const toggleFilter = () => setShowFilter((prev) => !prev);

  const getMinMax = useCallback(({ min, max, currentLow, currentHigh }: { min: number; max: number; currentLow: number; currentHigh: number }) => {
    if (min !== minPriceRef.current || max !== maxPriceRef.current) {
      minPriceRef.current = min;
      maxPriceRef.current = max;
    }

    if (currentLow !== currentLowPriceRef.current || currentHigh !== currentHighPriceRef.current) {
      currentLowPriceRef.current = currentLow;
      currentHighPriceRef.current = currentHigh;
      debouncedUpdate(currentLow, currentHigh);
    }
  }, []);

  if (maxPriceRef.current === minPriceRef.current) return null;

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
            min={minPriceRef.current}
            max={maxPriceRef.current}
            currentLow={parseInt(currentLowPriceRef.current.toString())}
            currentHigh={parseInt(currentHighPriceRef.current.toString())}
            onChange={getMinMax}
          />
          {/* <div>
            <button onClick={onClick} className={"box-button mt-3"}>
              Filter Price
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PriceRange;
