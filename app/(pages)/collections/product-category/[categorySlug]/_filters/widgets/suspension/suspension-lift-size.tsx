"use client";
import { TSingleFilter } from "@/app/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/filter-heading";
import SelectFilterTemplate from "../../template/select-filter-template";

const SuspensionLiftSize = ({
  liftSize,
  filterKey,
}: {
  filterKey: string;
  liftSize: TSingleFilter[];
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
        title="Lift Size"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={liftSize} />
      )}
    </>
  );
};

export default SuspensionLiftSize;
