"use client";
import { useAppDispatch, useTypedSelector } from '@/app/globalRedux/store';
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import { fetchWheelData } from "@/hooks/wheelService";
import React, { useEffect } from "react";
import SidebarFilters from "../_filters/mobile-filters/sidebar-filters";
import WheelFilters from "../_filters/wheel-filters";
import WheelYMMFilters from "../_filters/widgets/wheels/wheel-ymm-filter";
import NoProductsFound from "../no-products-found";
import ProductCard from "./product-card";
// import Loading from '../../../product/[singleProduct]/loading';
import ProductCardSkeleton from '../_loading/product-card-skeleton';
import Container from '@/app/ui/container/container';
import FilterLoadingSkeleton from '../_loading/filter-loading-skeleton';
const WheelsCategory: React.FC = () => {
  const dispatch = useAppDispatch()
  const { data, filters, loading } = useTypedSelector(state => state.wheel)

  useEffect(() => {
    fetchWheelData(dispatch, filters)
  }, [filters, dispatch])

  if (loading) {
    return (
      <Container>
      <div className="flex w-full gap-6 pt-6">
                <div className={'hidden lg:block lg:w-1/4'}>
                    <FilterLoadingSkeleton />
                </div>
                <div className={'w-full lg:w-3/4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min'}>
                    {
                        Array(12).fill(0).map((_, index) => <ProductCardSkeleton key={`product-card-loading-${index}`} />)
                    }
                </div>
            </div>
      </Container>
    )
  }

  return (
    <>
      <div className="w-full max-w-[1450px] flex flex-col md:flex-row gap-6 px-4 py-6 mx-auto">
        <div className="w-full md:hidden">
          <SidebarFilters>
            <WheelFilters />
          </SidebarFilters>
        </div>
        <div className="hidden md:flex flex-col gap-3 md:w-[400px] h-full">
          <WheelYMMFilters />
          <WheelFilters />
        </div>
        {data?.products.length === 0 ? (
          <>
            <NoProductsFound />
          </>
        ) : (
          <>
            <div className="w-full flex flex-col">
              <div className="p-2">
                <Breadcrumb>
                  <Item href={"/"}>Home</Item>
                  <Item href={"/"}>Collections</Item>
                  <Item href={"/collections/product-category/wheels"}>
                    Wheels
                  </Item>
                </Breadcrumb>
              </div>
              <div
                className={
                  "w-full flex flex-row flex-wrap gap-4 justify-center"
                }
              >
                {data?.products.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WheelsCategory;
