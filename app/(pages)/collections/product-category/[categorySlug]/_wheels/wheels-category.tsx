"use client";
import { useTypedSelector } from "@/app/globalRedux/store";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import { wrapWheelFilters } from "@/hooks/wheelService";
import React from "react";
import SidebarFilters from "../_filters/mobile-filters/sidebar-filters";
import WheelFilters from "../_filters/wheel-filters";
import WheelYMMFilters from "../_filters/widgets/wheels/wheel-ymm-filter";
import NoProductsFound from "../no-products-found";
import ProductCard from "./product-card";
// import Loading from '../../../product/[singleProduct]/loading';
import { useGetProductListQuery } from "@/app/globalRedux/api/product";
import { Paginate } from "@/components/shared/paginate";
import { TInventoryItem } from "@/types/product";
import { useSearchParams } from "next/navigation";
import SortByFilter from "../_filters/sort-by-filter";
import { useFilterSync } from "../_filters/store";
import ProductCardSkeleton from "../_loading/product-card-skeleton";
import MobileYmmFilter from "../_filters/mobile-ymm/mobile-ymm-filter";
type ProductsPageProps = {
  page?: number;
};
const WheelsCategory: React.FC<ProductsPageProps> = ({ page = 1 }) => {
  const searchParams = useSearchParams();
  const { filters } = useFilterSync();
  const ymm = useTypedSelector(state => state.yearMakeModel);
  const parsedFilter = wrapWheelFilters(filters, Number.isNaN(page) ? 1 : page, filters["vehicle"] ? ymm.vehicleInformation : {})
  const { data, isLoading: loading } = useGetProductListQuery(parsedFilter)
  return (
    <>
      <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-6 px-4 py-6 md:flex-row">
        <div className="w-full flex flex-row gap-2 justify-between  md:hidden">
          <SidebarFilters>
            <WheelFilters />
          </SidebarFilters>
          <MobileYmmFilter>
            <WheelYMMFilters />
          </MobileYmmFilter>
          <div className="w-full max-w-[165px]">
            <SortByFilter />
          </div>
        </div>
        <div className="hidden h-full flex-col gap-3 md:flex md:w-[400px]">
          <WheelYMMFilters />
          <WheelFilters />
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
        ) : data?.products.length === 0 ? (
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
                    <Item href={"/collections/product-category/wheels"}>
                      Wheels
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
                {data?.products.map((product: TInventoryItem) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
              <div className="mt-8 flex w-full flex-row flex-wrap justify-center gap-4">
                <Paginate
                  searchParams={new URLSearchParams(searchParams)}
                  totalPages={data?.pages}
                  categorySlug={"wheels"}
                  page={page}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WheelsCategory;
