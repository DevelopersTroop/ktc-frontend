"use client";
import debounce from "lodash/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

type Filters = Record<string, string>;

export const useFilterSync = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [localFilters, setLocalFilters] = useState<Filters>({});
	console.log("TCL: useFilterSync -> localFilters", localFilters)

  /**
   * ✅ Extract only your "filter keys"
   * Example: ignore cartPackage, cartSerial, session, etc.
   */
  const parsedFilters = useMemo<Filters>(() => {
    const params: Filters = {};
    searchParams.forEach((value, key) => {
      // only include keys you want to treat as filters
      if (["cartPackage", "cartSerial"].includes(key)) return;
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  // ✅ Sync local state with URL for only managed filters
  useEffect(() => {
    setLocalFilters(parsedFilters);
  }, [parsedFilters]);

  /**
   * ✅ Debounced query updater
   * - Starts with existing URL params
   * - Removes only managed filters
   * - Re-adds updated filters
   */
  const updateQueryParams = useMemo(
    () =>
      debounce((filters: Filters) => {
        // 1️⃣ start with full query (so we keep cartPackage, cartSerial, etc.)
        const params = new URLSearchParams(searchParams.toString());

        // 2️⃣ remove all keys we manage (clean slate for filters)
        Object.keys(parsedFilters).forEach((key) => params.delete(key));

        // 3️⃣ add updated filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value.trim()) params.set(key, value);
        });

        // 4️⃣ build final URL
        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(url, { scroll: false });
      }, 150),
    [router, pathname, searchParams, parsedFilters],
  );

  // ✅ Cleanup debounce
  useEffect(() => {
    return () => updateQueryParams.cancel();
  }, [updateQueryParams]);

  // ✅ Auto-update URL when filters change
  useEffect(() => {
    updateQueryParams(localFilters);
  }, [localFilters, updateQueryParams]);

  // ✅ Toggle logic
  const toggleFilterValue = useCallback(
    (key: string, value: string, acceptMultiple = true) => {
      setLocalFilters((prev) => {
        const prevValues = prev[key]?.split(",").filter(Boolean) || [];
        let newValues: string[];

        if (acceptMultiple) {
          newValues = prevValues.includes(value)
            ? prevValues.filter((v) => v !== value)
            : [...prevValues, value];
        } else {
          newValues = [value];
        }

        const updated = { ...prev };
        if (newValues.length === 0) {
          delete updated[key];
        } else {
          updated[key] = newValues.join(",");
        }

        return updated;
      });
    },
    [],
  );

  // ✅ For search field / inputs
  const handleSearch = useCallback((key: string, value: string) => {
    setLocalFilters((prev) => {
      const updated = { ...prev };
      if (!value.trim()) delete updated[key];
      else updated[key] = value;
      return updated;
    });
  }, []);

  // ✅ Helpers
  const removeKey = useCallback((key: string) => {
    setLocalFilters((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }, []);

  const removeSorting = useCallback(() => removeKey("sort"), [removeKey]);

  const clearFilters = useCallback(() => {
    setLocalFilters({});
  }, []);

  return {
    filters: localFilters,
    toggleFilterValue,
    handleSearch,
    removeKey,
    removeSorting,
    clearFilters,
  };
};
