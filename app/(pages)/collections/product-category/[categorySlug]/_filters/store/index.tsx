import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useCallback } from "react";
import debounce from "lodash/debounce"; // Use lodash for better debounce handling
import { useAppDispatch, useTypedSelector } from "@/app/globalRedux/store";
import { updateFilters } from "@/app/globalRedux/features/wheel";

// Define filter type
type Filters = Record<string, string>;

const useFilterSync = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { filters: reduxFilters } = useTypedSelector((state) => state.wheel);
    const [localFilters, setLocalFilters] = useState<Filters>(reduxFilters as any);

    // Convert searchParams to an object
    const parsedFilters = useMemo<Filters>(() => {
        const params: Filters = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }, [searchParams]);

    // Merge Redux filters with URL filters (URL filters take priority)
    useEffect(() => {
        const mergedFilters = { ...reduxFilters, ...parsedFilters };
        // Prevent unnecessary updates
        if (JSON.stringify(localFilters) !== JSON.stringify(mergedFilters)) {
            setLocalFilters(mergedFilters as any);
            dispatch(updateFilters(mergedFilters));
        }
    }, [dispatch, parsedFilters, reduxFilters, localFilters]);

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

                return { ...prev, [key]: finalValue };
            });
        },
        []
    );

    // Debounced function to update URL query params
    const updateQueryParams = useCallback(
        debounce((filters: Filters) => {
            const query = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
                if (value) query.append(key, value);
            });
            router.push(`?${query.toString()}`, { scroll: false });
        }, 500),
        [router]
    );

    // Update query params when filters change
    useEffect(() => {
        updateQueryParams(localFilters);
        return () => updateQueryParams.cancel(); // Cleanup debounce on unmount
    }, [localFilters, updateQueryParams]);

    return { filters: localFilters, toggleFilterValue };
};

export default useFilterSync;
