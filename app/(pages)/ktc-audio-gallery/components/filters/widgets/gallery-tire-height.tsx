"use client";
import FilterHeading from "@/app/(pages)/collections/product-category/[categorySlug]/_filters/template/filter-heading";
import SelectFilterTemplate from "@/app/(pages)/collections/product-category/[categorySlug]/_filters/template/select-filter-template";
import { TSingleFilter } from "@/app/types/filter";
import { useState } from "react";

const GalleryTireHeight = ({
  tireHeight,
  filterKey,
}: {
  filterKey: string;
  tireHeight: TSingleFilter[];
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
        title="Tire Height"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={tireHeight} />
      )}
    </>
  );
};

export default GalleryTireHeight;
