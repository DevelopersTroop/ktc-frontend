"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/filter-heading";
import SelectFilterTemplate from "../../template/select-filter-template";

const WheelMaterial = ({
  material,
  filterKey,
}: {
  filterKey: string;
  material: TSingleFilter[];
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
        title="Material"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={material} />
      )}
    </>
  );
};

export default WheelMaterial;
