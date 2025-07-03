"use client";
import { useGetProductListQuery } from "@/app/globalRedux/api/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import { Paginate } from "@/components/shared/paginate";
import { wrapTireFilters } from "@/hooks/tireService";
import { useSearchParams } from "next/navigation";
import React from "react";
import SidebarFilters from "../_filters/mobile-filters/sidebar-filters";
import SortByFilter from "../_filters/sort-by-filter";
import { useFilterSync } from "../_filters/store";
import TireFilters from "../_filters/tire-filters";
import ProductCardSkeleton from "../_loading/product-card-skeleton";
import NoProductsFound from "../no-products-found";
import TireCard from "./tire-card";

const TireCategory: React.FC<{ page: number }> = ({ page = 1 }) => {
  const searchParams = useSearchParams();
  const { filters } = useFilterSync();
  const { data, isLoading: loading } = useGetProductListQuery(wrapTireFilters(filters, Number.isNaN(page) ? 1 : page))
  return (
    <>
      <div className="flex justify-center items-center my-2.5">
        <h1 className="text-[20px] font-semibold">Aftermarket Truck Tires</h1>
      </div>
      <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-6 px-4 pb-6 pt-2 md:flex-row">
        <div className="w-full flex flex-row gap-2 justify-between  md:hidden">
          <SidebarFilters>
            <TireFilters />
          </SidebarFilters>

          <div className="w-full max-w-[165px]">
            <SortByFilter />
          </div>
        </div>
        <div className="hidden h-full flex-col gap-3 md:flex md:w-[400px]">
          <TireFilters />
        </div>
        {loading ? (
          <div
            className={
              "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            }
          >
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <ProductCardSkeleton key={`product-card-loading-${index}`} />
              ))}
          </div>
        ) : data?.products?.length === 0 ? (
          <>
            <NoProductsFound />
          </>
        ) : (
          <>
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-row justify-between">
                <div className="p-2">
                  <Breadcrumb>
                    <Item href={"/"}>Home</Item>
                    <Item href={"/"}>Collections</Item>
                    <Item href={"/collections/product-category/tires"}>
                      Tires
                    </Item>
                  </Breadcrumb>
                </div>
                <div className="hidden md:block w-full max-w-[180px]">
                  <SortByFilter />
                </div>
              </div>
              <div
                className={
                  "flex w-full flex-row flex-wrap justify-center gap-4"
                }
              >
                {data?.products?.map((product) => (
                  <TireCard product={product} key={product._id} />
                ))}
              </div>

              <div className="mt-8 flex w-full flex-row justify-center">
                <Paginate
                  searchParams={new URLSearchParams(searchParams)}
                  page={page}
                  totalPages={data?.pages}
                  categorySlug={"tires"}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TireCategory;
