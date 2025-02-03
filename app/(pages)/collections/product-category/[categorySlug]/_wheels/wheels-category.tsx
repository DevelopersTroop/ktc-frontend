"use client";
import { TInventoryItem } from "@/app/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import React from "react";
import SidebarFilters from "../_filters/mobile-filters/sidebar-filters";
import WheelFilters from "../_filters/wheel-filters";
import WheelYMMFilters from "../_filters/widgets/wheels/wheel-ymm-filter";
import NoProductsFound from "../no-products-found";
import ProductCard from "./product-card";

const productData: TInventoryItem[] = [
  {
    _id: 1,
    slug: "wheels",
    title: {
      brand: "American Force AFW 09",
      model: "CAESAR CHROME",
      subtitle: "20X12-51MM",
    },
    price: 1699.0,
    description: "High quality wheel",
    item_image: "/images/wheels/wheels1.png",
    item_promo: "Save up to $68.96 When Adding Tires to Package",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Tue, Jan 21",
  },
  {
    _id: 2,
    slug: "wheel",
    title: {
      brand: "American Force AFW 09",
      model: "CAESAR CHROME",
      subtitle: "18X8-40MM",
    },
    price: 4371.0,
    description: "Durable and reliable wheel",
    item_image: "/images/wheels/wheels2.png",
    item_promo: "Save up to $68.96 When Adding Tires to Package",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Tue, Jan 21",
  },
  {
    _id: 3,
    slug: "wheel",
    title: {
      brand: "American Force AFW 09",
      model: "CAESAR CHROME",
      subtitle: "18X8-40MM",
    },
    price: 4371.0,
    description: "Durable and reliable wheel",
    item_image: "/images/wheels/wheels3.png",
    item_promo: "Save up to $68.96 When Adding Tires to Package",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Tue, Jan 21",
  },
  {
    _id: 4,
    slug: "wheel",
    title: {
      brand: "American Force AFW 09",
      model: "CAESAR CHROME",
      subtitle: "18X8-40MM",
    },
    price: 4371.0,
    description: "Durable and reliable wheel",
    item_image: "/images/wheels/wheels4.png",
    item_promo: "Save up to $68.96 When Adding Tires to Package",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Tue, Jan 21",
  },
  {
    _id: 5,
    slug: "wheel",
    title: {
      brand: "American Force AFW 09",
      model: "CAESAR CHROME",
      subtitle: "18X8-40MM",
    },
    price: 4371.0,
    description: "Durable and reliable wheel",
    item_image: "/images/wheels/wheels5.png",
    item_promo: "Save up to $68.96 When Adding Tires to Package",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Tue, Jan 21",
  },
  {
    _id: 6,
    slug: "wheel",
    title: {
      brand: "American Force AFW 09",
      model: "CAESAR CHROME",
      subtitle: "18X8-40MM",
    },
    price: 4371.0,
    description: "Durable and reliable wheel",
    item_image: "/images/wheels/wheels6.png",
    item_promo: "Save up to $68.96 When Adding Tires to Package",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Tue, Jan 21",
  },
  {
    _id: 7,
    slug: "wheel",
    title: {
      brand: "American Force AFW 09",
      model: "CAESAR CHROME",
      subtitle: "18X8-40MM",
    },
    price: 4371.0,
    description: "Durable and reliable wheel",
    item_image: "/images/wheels/wheels7.png",
    item_promo: "Save up to $68.96 When Adding Tires to Package",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Tue, Jan 21",
  },
  {
    _id: 8,
    slug: "wheel",
    title: {
      brand: "American Force AFW 09",
      model: "CAESAR CHROME",
      subtitle: "18X8-40MM",
    },
    price: 4371.0,
    description: "Durable and reliable wheel",
    item_image: "/images/wheels/wheels7.png",
    item_promo: "Save up to $68.96 When Adding Tires to Package",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Tue, Jan 21",
  },
  // Add more products as needed
];

const WheelsCategory: React.FC = () => {
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
        {productData.length === 0 ? (
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
                {productData.map((product) => (
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
