"use client";
import { TInventoryItem } from "@/app/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import React from "react";
import AccessoriesFilters from "../_filters/accessories-filters";
import SidebarFilters from "../_filters/mobile-filters/sidebar-filters";
import AccessoriesYMMFilters from "../_filters/widgets/accessories/accessories-ymm-filter";
import NoProductsFound from "../no-products-found";
import AccessoriesCard from "./accessories-card";

const productData: TInventoryItem[] = [
  {
    _id: 1,
    slug: "accessories",
    title: {
      subtitle: "Body Armor 4x4 Back bone Hitch Skid",
    },
    price: 132.99,
    item_image: "/images/accessories/accessories1.webp",
    delivery_date: "Wednesday, Jan 22",
  },
  {
    _id: 2,
    slug: "accessories",
    title: {
      subtitle: "Rally Armor Universal Basic Plus Black Mud Flap/Red Logo",
    },
    price: 44.0,
    item_image: "/images/accessories/accessories2.webp",
    delivery_date: "Wednesday, Jan 22",
  },
  {
    _id: 3,
    slug: "accessories",
    title: {
      subtitle: 'Body Armor 4x4 3/4" Red D-Ring With Isolators (Single)',
    },
    price: 19.95,
    item_image: "/images/accessories/accessories3.webp",
    delivery_date: "Wednesday, Jan 22",
  },
  {
    _id: 4,
    slug: "accessories",
    title: {
      subtitle: 'Body Armor 4x4 3/4" Black D-Ring with Red Isolators',
    },
    price: 15.95,
    item_image: "/images/accessories/accessories4.webp",
    delivery_date: "Wednesday, Jan 22",
  },
  {
    _id: 5,
    slug: "accessories",
    title: {
      subtitle: "Rough Country 9500LB Pro Series Winch | Steel Cable",
    },
    price: 329.95,
    item_image: "/images/accessories/accessories5.webp",
    delivery_date: "Wednesday, Jan 22",
  },
  {
    _id: 6,
    slug: "accessories",
    title: {
      subtitle: "Rough Country 12000LB Pro Series Winch | Steel Cable",
    },
    price: 49.99,
    item_image: "/images/accessories/accessories6.webp",
    delivery_date: "Wednesday, Jan 22",
  },
  {
    _id: 7,
    slug: "accessories",
    title: {
      subtitle: 'Rough Country Flag Pole Holder | Dual | 2" Hitch',
    },
    price: 49.95,
    item_image: "/images/accessories/accessories7.webp",
    delivery_date: "Wednesday, Jan 22",
  },
  {
    _id: 8,
    slug: "accessories",
    title: {
      subtitle: "AMP Research BedXtender HD Mounting Kit",
    },
    price: 19.99,
    item_image: "/images/accessories/accessories8.webp",
    delivery_date: "Wednesday, Jan 22",
  },
  // Add more products as needed
];

const AccessoriesCategory: React.FC = () => {
  return (
    <>
      <div className="w-full max-w-[1450px] flex flex-col md:flex-row gap-6 px-4 py-6 mx-auto">
        <div className="w-full md:hidden">
          <SidebarFilters>
            <AccessoriesFilters />
          </SidebarFilters>
        </div>
        <div className="hidden md:flex flex-col gap-3 md:w-[400px] h-full">
          <AccessoriesYMMFilters />
          <AccessoriesFilters />
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
                  <Item href={"/collections/product-category/accessories"}>
                    Accessories
                  </Item>
                </Breadcrumb>
              </div>
              <div
                className={
                  "w-full flex flex-row flex-wrap gap-8 justify-center bg-gray-200 py-6"
                }
              >
                {productData.map((product) => (
                  <AccessoriesCard product={product} key={product._id} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AccessoriesCategory;
