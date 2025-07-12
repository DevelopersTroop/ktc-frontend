"use client";
import { TSingleFilter } from "@/types/filter";
import { useState } from "react";
import FilterHeading from "../../template/filter-heading";
import SelectFilterTemplate from "../../template/select-filter-template";

const WheelBoltPattern = ({
  boltPattern,
  filterKey,
}: {
  filterKey: string;
  boltPattern: TSingleFilter[];
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
        title="Bolt Pattern"
      />
      {showFilter && (
        <SelectFilterTemplate filterKey={filterKey} filterData={boltPattern} />
      )}
    </>
  );
};

export default WheelBoltPattern;
