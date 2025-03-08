import { customFetch } from "@/lib/common-fetch";
import { TFilters } from "@/types/filter";
import { IApiRes } from "@/types/redux-helper";
import { useEffect, useState } from "react";

export const useFetchFilters = (category:"wheels"|"tires"|"accessories") => {
  const [filters, setFilters] = useState<TFilters | null>(null);

  useEffect(() => {
    const fetchData = async function () {
      try {
        const { data } = await customFetch<IApiRes<{ filters: TFilters }>>(
          "products/filter-list",
          "POST",
          {
            body: {
              category,
            },
          },
        );
        setFilters(data.filters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category]);

  return {
    filters
  }
}
