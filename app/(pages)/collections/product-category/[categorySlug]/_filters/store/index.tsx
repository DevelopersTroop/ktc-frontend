"use client";
import debounce from "lodash/debounce"; // Use lodash for better debounce handling
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

// Define filter type
type Filters = Record<string, string>;

export const useFilterSync = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [localFilters, setLocalFilters] = useState<Filters>({});

  // Convert searchParams to an object
  const parsedFilters = useMemo<Filters>(() => {
    const params: Filters = {};
    searchParams.forEach((value, key) => {
      if (key === "cartPackage" || key === "cartSerial") {
        return;
      }
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  // Sync state with URL parameters
  useEffect(() => {
    setLocalFilters(parsedFilters);
  }, [parsedFilters]);

  // Toggle filter value (handles multiple selections)
  const toggleFilterValue = useCallback(
    (key: string, value: string, acceptMultiple: boolean = true) => {
      setLocalFilters((prev) => {
        const prevValues = prev[key] ? prev[key].split(",") : [];
        let finalValue: string;

        if (acceptMultiple) {
          if (prevValues.includes(value)) {
            finalValue = prevValues.filter((val) => val !== value).join(",");
          } else {
            finalValue = [...prevValues, value].join(",");
          }
        } else {
          finalValue = value;
        }

        const updatedFilters = { ...prev, [key]: finalValue };

        // Remove empty filters
        if (!finalValue) {
          delete updatedFilters[key];
        }

        return updatedFilters;
      });
    },
    [],
  );

  const handleSearch = (key: string, value: string) => {
    const updatedFilters = { ...parsedFilters, ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    updateQueryParams(updatedFilters);
  };

  // Debounced function to update URL query params
  const updateQueryParams = useCallback(
    debounce((filters: Filters) => {
      const query = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) query.set(key, value); // Use set() instead of append() for unique keys
      });

      router.replace(`${pathname}?${decodeURIComponent(query.toString())}`, {
        scroll: false,
      });
    }, 0),
    [router, pathname],
  );

  // Update query params when filters change
  useEffect(() => {
    updateQueryParams(localFilters);
    return () => updateQueryParams.cancel(); // Cleanup debounce on unmount
  }, [localFilters, updateQueryParams]);

  const removeSorting = () => {
    const updatedFilters = { ...localFilters };
    delete updatedFilters["sort"];
    setLocalFilters(updatedFilters);
    updateQueryParams(updatedFilters);
  };

  const clearFilters = () => {
    setLocalFilters({});
    updateQueryParams({});
  };

  return {
    filters: localFilters,
    toggleFilterValue,
    handleSearch,
    removeSorting,
    clearFilters,
  };
};
