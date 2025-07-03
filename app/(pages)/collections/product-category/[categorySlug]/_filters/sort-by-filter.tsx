import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useFilterSync } from "./store";

const SortByFilter = () => {
  const { toggleFilterValue } = useFilterSync();
  const sortObject = {
    "Price (low to high)": {
      value: "msrp",
      order: "asc",
    },
    "Price (high to low)": {
      value: "msrp",
      order: "desc",
    },
    "Name (A to Z)": {
      value: "title",
      order: "asc",
    },
    "Name (Z to A)": {
      value: "title",
      order: "desc",
    },
  };

  const queryParamsObject = {
    "title,asc": "Name (A to Z)",
    "title,desc": "Name (Z to A)",
    "msrp,asc": "Price (low to high)",
    "msrp,desc": "Price (high to low)",
  };

  const searchParams = useSearchParams();
  return (
    <div className="w-full max-w-[500px]">
      <Select
        onValueChange={(value: keyof typeof sortObject) =>
          toggleFilterValue(
            "sort",
            `${sortObject[value].value},${sortObject[value].order}`,
            false,
          )
        }
        value={queryParamsObject[searchParams.get("sort")] || undefined}
      >
        <SelectTrigger className="w-full max-w-[180px]">
          <SelectValue className="capitalize" placeholder="Sort options" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort Options</SelectLabel>
            {Object.entries(sortObject).map(([key]) => {
              return (
                <SelectItem key={key} value={key}>
                  {key}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortByFilter;
