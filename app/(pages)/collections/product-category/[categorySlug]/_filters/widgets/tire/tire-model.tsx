"use client";
import { TSingleFilter } from "@/app/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/filter-heading";
import SelectFilterTemplate from "../../template/select-filter-template";

const TireModel = ({
  model,
  filterKey,
}: {
  filterKey: string;
  model: TSingleFilter[];
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
        title="Model"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={model} />
      )}
    </>
  );
};

export default TireModel;
