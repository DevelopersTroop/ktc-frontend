"use client";
import { TInventoryItem } from "@/app/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import React from "react";
import SidebarFilters from "../_filters/mobile-filters/sidebar-filters";
import TireFilters from "../_filters/tire-filters";
import NoProductsFound from "../no-products-found";
import TireCard from "./tire-card";

const productData: TInventoryItem[] = [
  {
    _id: 1,
    slug: "tire",
    title: {
      subtitle: "Rbp Repulsor rt 33X12.50R20LT",
    },
    price: 971.48,
    description: "High quality tire",
    item_image: "/images/tires/tire1.webp",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Wed, Jan 22",
    tire_type: "Hybrid At/Mt",
    warranty: "Manufacturer Mileage Warranty",
  },
  {
    _id: 2,
    slug: "tire",
    title: {
      subtitle: "Nitto Ridge Grappler 35x12.50R20LT",
    },
    price: 1904.0,
    description: "Durable and reliable wheel",
    item_image: "/images/tires/tire2.webp",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Wed, Jan 22",
    tire_type: "Hybrid At/Mt",
    warranty: "Manufacturer Mileage Warranty",
  },
  {
    _id: 3,
    slug: "tire",
    title: {
      subtitle: "Venom Power Terra Hunter X/T 33x12.50R20LT",
    },
    price: 1209.72,
    description: "Durable and reliable wheel",
    item_image: "/images/tires/tire3.webp",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Wed, Jan 22",
    tire_type: "All terrain",
    warranty: "60K Mileage Warranty",
  },
  {
    _id: 4,
    slug: "tire",
    title: {
      subtitle: "Gladiator XComp MT 35x12.50R20LT",
    },
    price: 1289.16,
    description: "Durable and reliable wheel",
    item_image: "/images/tires/tire4.webp",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Wed, Jan 22",
    tire_type: "Hybrid At/Mt",
    warranty: "Manufacturer Mileage Warranty",
  },
  {
    _id: 5,
    slug: "tire",
    title: {
      subtitle: "RBP Repulsor RT 35x12.50R20LT",
    },
    price: 1019.48,
    description: "Durable and reliable wheel",
    item_image: "/images/tires/tire5.webp",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Wed, Jan 22",
    tire_type: "Hybrid At/Mt",
    warranty: "5ok Mileage Warranty",
  },
  {
    _id: 6,
    slug: "tire",
    title: {
      subtitle: "Nitto Ridge Grappler 33x12.50R20LT",
    },
    price: 1904.32,
    description: "Durable and reliable wheel",
    item_image: "/images/tires/tire6.webp",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Wed, Jan 22",
    tire_type: "Hybrid At/Mt",
    warranty: "50k Mileage Warranty",
  },
  {
    _id: 7,
    slug: "tire",
    title: {
      subtitle: "AMP Pro AT 33x12.50R20",
    },
    price: 1007.96,
    description: "Durable and reliable wheel",
    item_image: "/images/tires/tire7.webp",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Wed, Jan 22",
    tire_type: "All terrain",
    warranty: "50k Mileage Warranty",
  },
  {
    _id: 8,
    slug: "tire",
    title: {
      subtitle: "Kenda Klever R/T 33x12.50R20",
    },
    price: 1204.88,
    description: "Durable and reliable wheel",
    item_image: "/images/tires/tire8.webp",
    item_shipping: "In Stock & free quick delivery as fast as",
    delivery_date: "Wed, Jan 22",
    tire_type: "all terrain",
    warranty: "50k Mileage Warranty",
  },
  // Add more products as needed
];

const TireCategory: React.FC = () => {
  return (
    <>
      <div className="w-full max-w-[1450px] flex flex-col md:flex-row gap-6 px-4 py-6 mx-auto">
        <div className="w-full md:hidden">
          <SidebarFilters>
            <TireFilters />
          </SidebarFilters>
        </div>
        <div className="hidden md:flex flex-col gap-3 md:w-[400px] h-full">
          <TireFilters />
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
                  <Item href={"/collections/product-category/tires"}>
                    Tires
                  </Item>
                </Breadcrumb>
              </div>
              <div
                className={
                  "w-full flex flex-row flex-wrap gap-4 justify-center"
                }
              >
                {productData.map((product) => (
                  <TireCard product={product} key={product._id} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TireCategory;
