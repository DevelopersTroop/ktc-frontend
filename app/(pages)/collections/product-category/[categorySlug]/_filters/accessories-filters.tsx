"use client";

import { ActionFilter } from "@/components/shared/action-filter";
import { useFetchFilters } from "@/hooks/useFetchFilters";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import AccessoriesBrand from "./widgets/accessories/accessories-brand";
import AccessoriesSearchByKey from "./widgets/accessories/accessories-search-by-key";
import AccessoriesSubCategory from "./widgets/accessories/accessories-subcategory";
const AccessoriesFilters = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchKey, setSearchKey] = useState(query);
  const { filters } = useFetchFilters("accessories");
  // Rerender every time if the search key changes
  useSearchFilter(searchKey, setSearchKey, query);

  return (
    <div className={"filter-shadow bg-gray-200"}>
      <ActionFilter />

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
