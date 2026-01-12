"use client";
import FilterHeading from "@/app/(pages)/collections/product-category/[categorySlug]/_filters/template/filter-heading";
import SelectFilterTemplate from "@/app/(pages)/collections/product-category/[categorySlug]/_filters/template/select-filter-template";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";

const SuspensionBrand = ({
  suspensionBrand,
  filterKey,
}: {
  filterKey: string;
  suspensionBrand: TSingleFilter[];
}) => {
  const [showFilter, setshowFilter] = useState(false);

  const toggleFilter = () => {
    setshowFilter(!showFilter);
  };

  return (
    <>
      <FilterHeading
        showFilter={showFilter}
        toggleFilter={toggleFilter}
        title="Suspension Brand"
      />
      {showFilter && (
        <SelectFilterTemplate
          filterKey={filterKey}
          filterData={suspensionBrand}
        />
      )}
    </>
  );
};

export default SuspensionBrand;
