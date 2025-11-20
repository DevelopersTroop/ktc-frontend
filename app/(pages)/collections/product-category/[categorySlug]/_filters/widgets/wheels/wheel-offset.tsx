"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/filter-heading";
import SelectFilterTemplate from "../../template/select-filter-template";

const WheelOffset = ({
  offset,
  filterKey,
}: {
  filterKey: string;
  offset: TSingleFilter[];
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
        title="Wheel Offset"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={offset} />
      )}
    </>
  );
};

export default WheelOffset;
