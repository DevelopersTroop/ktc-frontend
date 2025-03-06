"use client";
import { useAppDispatch, useTypedSelector } from "@/app/globalRedux/store";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import { Paginate } from "@/components/shared/paginate";
import { fetchTireData } from "@/hooks/tireService";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import SidebarFilters from "../_filters/mobile-filters/sidebar-filters";
import { useFilterSync } from "../_filters/store";
import TireFilters from "../_filters/tire-filters";
import ProductCardSkeleton from "../_loading/product-card-skeleton";
import NoProductsFound from "../no-products-found";
import TireCard from "./tire-card";

const TireCategory: React.FC<{ page: number }> = ({ page = 1 }) => {
  const searchParams = useSearchParams();
  const { data, loading } = useTypedSelector((state) => state.tire);
  const { filters } = useFilterSync();
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchTireData(dispatch, filters, page);
  }, [filters, dispatch, page]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-6 px-4 py-6 md:flex-row">
        <div className="w-full md:hidden">
          <SidebarFilters>
            <TireFilters />
          </SidebarFilters>
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
              <div className="p-2">
                <Breadcrumb>
                  <Item href={"/"}>Home</Item>
                  <Item href={"/"}>Collections</Item>
                  <Item href={"/collections/product-category/tires"}>
                    Tires
                  </Item>
                </Breadcrumb>
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
