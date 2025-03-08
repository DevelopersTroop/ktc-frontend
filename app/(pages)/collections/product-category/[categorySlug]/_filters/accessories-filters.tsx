"use client";

import { useFetchFilters } from "@/hooks/useFetchFilters";
import debounce from "debounce";
import { useEffect, useState } from "react";
import { useFilterSync } from "./store";
import AccessoriesBrand from "./widgets/accessories/accessories-brand";
import AccessoriesSearchByKey from "./widgets/accessories/accessories-search-by-key";
import AccessoriesSubCategory from "./widgets/accessories/accessories-subcategory";

const AccessoriesFilters = () => {
  const { handleSearch, filters: activeFilters } = useFilterSync();
  const [searchKey, setSearchKey] = useState("");
  const { filters } = useFetchFilters("accessories");

  useEffect(() => {
    const debouncedToggle = debounce(() => {
      handleSearch("q", searchKey);
    }, 500);
    debouncedToggle();
    return () => {
      debouncedToggle.clear();
    };
  }, [searchKey, handleSearch]);

  // useEffect(() => {
  //   if (activeFilters?.q?.length) setSearchKey(activeFilters.q);
  // }, [activeFilters?.q]);

  return (
    <div className={"filter-shadow bg-gray-200"}>
      <div
        className={
          "sticky top-7 z-40 flex justify-between border-b border-gray-300 bg-gray-100 px-5 py-3 text-lg font-medium text-gray-800 md:static md:bg-transparent"
        }
      >
        <p>Action Filter</p>
        <p className="hidden cursor-pointer text-sm text-primary hover:text-primary-hover md:block">
          Clear filter
        </p>
      </div>

      <div className={"border-y border-gray-300 px-5 py-3"}>
        <AccessoriesSubCategory
          filterKey={"product_sub_type"}
          subCategory={filters?.product_sub_type || []}
        />
      </div>
      <div className={"border-b border-gray-300 px-5 py-3"}>
        <AccessoriesBrand filterKey={"brand"} brand={filters?.brand || []} />
      </div>

      <div className={"border-b border-gray-300 px-5 py-3"}>
        <AccessoriesSearchByKey
          setSearchKey={setSearchKey}
          searchKey={searchKey}
        />
      </div>
    </div>
  );
};

export default AccessoriesFilters;
