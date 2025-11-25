"use client";

import { useFetchFilters } from "@/hooks/useFetchFilters";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") as
    | "wheels"
    | "tires"
    | "accessories";
  const { filters, loading } = useFetchFilters(query);

  console.log("TCL: Page -> loading", loading);

  const link = useMemo(() => {
    switch (query) {
      case "wheels":
        return "/collections/product-category/wheels?brand_desc";
      case "accessories":
        return "/collections/product-category/accessories?brand_desc";
      case "tires":
        return "/collections/product-category/tires?brand_desc";
      default:
        return "";
    }
  }, [query]);

  return (
    <div className="grid grid-cols-12 container py-12 gap-4 px-4">
      {loading ? (
        // ✅ Skeleton loading placeholders
        Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="col-span-3 h-12 rounded-md bg-gray-200 animate-pulse"
          ></div>
        ))
      ) : filters?.brand_desc?.length ? (
        // ✅ Visible, styled brand links
        filters.brand_desc.map((b, i) => (
          <div key={i} className="col-span-6 md:col-span-4 lg:col-span-3">
            <Link
              href={`${link}=${b.value}`}
              className="flex justify-center w-full bg-white border border-gray-200 hover:border-primary text-gray-700 hover:text-primary font-medium rounded-md h-12  items-center transition-all shadow-sm hover:shadow-md"
            >
              {b.value}
            </Link>
          </div>
        ))
      ) : (
        // ✅ Empty state
        <div className="col-span-12 text-center py-12">
          <h2 className="text-gray-500 text-2xl">No result found</h2>
        </div>
      )}
    </div>
  );
}
