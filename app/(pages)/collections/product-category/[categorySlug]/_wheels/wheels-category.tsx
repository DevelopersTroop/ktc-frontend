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
const WheelsCategory: React.FC = () => {
  const dispatch = useAppDispatch()
  const { data, filters } = useTypedSelector(state => state.wheel)

  useEffect(() => {
    fetchWheelData(dispatch, filters)
  }, [filters, dispatch])
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
