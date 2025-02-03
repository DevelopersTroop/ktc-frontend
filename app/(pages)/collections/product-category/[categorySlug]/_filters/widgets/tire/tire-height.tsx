"use client";
import { TSingleFilter } from "@/app/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/filter-heading";
import SelectFilterTemplate from "../../template/select-filter-template";

const TireHeight = ({
  height,
  filterKey,
}: {
  filterKey: string;
  height: TSingleFilter[];
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
        <SelectFilterTemplate filterKey={filterKey} filterData={height} />
      )}
    </>
  );
};

export default TireHeight;
