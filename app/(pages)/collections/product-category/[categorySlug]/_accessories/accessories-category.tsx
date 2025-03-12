"use client";
import { useAppDispatch, useTypedSelector } from "@/app/globalRedux/store";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import { Paginate } from "@/components/shared/paginate";
import { fetchAccessoriesData } from "@/hooks/accessoriesService";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import AccessoriesFilters from "../_filters/accessories-filters";
import SidebarFilters from "../_filters/mobile-filters/sidebar-filters";
import { useFilterSync } from "../_filters/store";
import AccessoriesYMMFilters from "../_filters/widgets/accessories/accessories-ymm-filter";
import ProductCardSkeleton from "../_loading/product-card-skeleton";
import NoProductsFound from "../no-products-found";
import AccessoriesCard from "./accessories-card";
import SortByFilter from "../_filters/sort-by-filter";

type ProductsPageProps = {
  page?: number;
};

const AccessoriesCategory: React.FC<ProductsPageProps> = ({ page = 1 }) => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { data, loading } = useTypedSelector((state) => state.accessories);

  const { filters } = useFilterSync();

  useEffect(() => {
    fetchAccessoriesData(dispatch, filters, Number.isNaN(page) ? 1 : page);
  }, [filters, dispatch, page]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1450px] flex-col gap-6 px-4 py-6 md:flex-row">
        <div className="w-full flex flex-row justify-between md:hidden">
          <SidebarFilters>
            <AccessoriesFilters />
          </SidebarFilters>

          <div className="w-full max-w-[165px]">
              <SortByFilter />
          </div>
        </div>
        <div className="hidden h-full flex-col gap-3 md:flex md:w-[400px]">
          {/* <AccessoriesYMMFilters /> */}
          <AccessoriesFilters />
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
                    <Item href={"/collections/product-category/accessories"}>
                      Accessories
                    </Item>
                  </Breadcrumb>
                </div>
                <div className="hidden md:block w-full max-w-[180px]">
                  <SortByFilter />
                </div>
              </div>
              <div
                className={
                  "flex w-full flex-row flex-wrap justify-center gap-8 bg-gray-200 py-6"
                }
              >
                {data?.products.map((product) => (
                  <AccessoriesCard product={product} key={product._id} />
                ))}
              </div>
              <div className="mt-8 flex w-full flex-row flex-wrap justify-center gap-4">
                <Paginate
                  searchParams={new URLSearchParams(searchParams)}
                  totalPages={data?.pages}
                  categorySlug={"accessories"}
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

export default AccessoriesCategory;
