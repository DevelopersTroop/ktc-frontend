"use client";
import FilterHeading from "@/app/(pages)/collections/product-category/[categorySlug]/_filters/template/filter-heading";
import SelectFilterTemplate from "@/app/(pages)/collections/product-category/[categorySlug]/_filters/template/select-filter-template";
import { TSingleFilter } from "@/app/types/filter";
import { useState } from "react";

const GalleryWheelDiameter = ({
  diameter,
  filterKey,
}: {
  filterKey: string;
  diameter: TSingleFilter[];
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
        title="Wheel Diameter"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={diameter} />
      )}
    </>
  );
};

export default GalleryWheelDiameter;
