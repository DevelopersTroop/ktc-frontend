"use client";
import FilterHeading from "@/app/(pages)/collections/product-category/[categorySlug]/_filters/template/filter-heading";
import SelectFilterTemplate from "@/app/(pages)/collections/product-category/[categorySlug]/_filters/template/select-filter-template";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";

const GalleryWheelWidth = ({
  wheelWidth,
  filterKey,
}: {
  filterKey: string;
  wheelWidth: TSingleFilter[];
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
        title="Wheel Width"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={wheelWidth} />
      )}
    </>
  );
};

export default GalleryWheelWidth;
