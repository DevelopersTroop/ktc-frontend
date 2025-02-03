"use client";
import { TInventoryItem } from "@/app/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import React from "react";
import SidebarFilters from "../_filters/mobile-filters/sidebar-filters";
import SuspensionFilters from "../_filters/suspension-filters";
import SuspensionYMMFilters from "../_filters/widgets/suspension/suspension-ymm-filter";
import NoProductsFound from "../no-products-found";
import SuspensionCard from "./suspension-card";

const productData: TInventoryItem[] = [
  {
    _id: 1,
    slug: "suspension",
    title: {
      subtitle: "Rough Country M1 Shock Shaft Protector | Pair",
    },
    price: 19.95,
    item_image: "/images/suspension/suspension1.webp",
    delivery_date: "Saturday, Jan 18",
  },
  {
    _id: 2,
    slug: "suspension",
    title: {
      subtitle: "Rough Country Wireless Air Bag Controller Kit w/Compressor",
    },
    price: 599.95,
    item_image: "/images/suspension/suspension2.webp",
    delivery_date: "Saturday, Jan 18",
  },
  {
    _id: 3,
    slug: "suspension",
    title: {
      subtitle: "Rough Country V2 Shock Shaft Protector",
    },
    price: 19.95,
    item_image: "/images/suspension/suspension3.webp",
    delivery_date: "Saturday, Jan 18",
  },
  {
    _id: 4,
    slug: "suspension",
    title: {
      subtitle: 'ReadyLIFT 1.5" Leveling Kit (19-24 Chevy/GMC 1500)',
    },
    price: 139.95,
    item_image: "/images/suspension/suspension4.webp",
    delivery_date: "Saturday, Jan 18",
  },
  {
    _id: 5,
    slug: "suspension",
    title: {
      subtitle:
        'Rough Country 2" Leveling Kit | Loaded Strut (19-23 Chevy/GMC 1500 | Gas)',
    },
    price: 329.95,
    item_image: "/images/suspension/suspension5.webp",
    delivery_date: "Saturday, Jan 18",
  },
  {
    _id: 6,
    slug: "suspension",
    title: {
      subtitle:
        'MotoFab 3" Front and 2" Rear Leveling Kit w/ Upper Control Arms (19-24 Chevrolet Silverado/GMC...',
    },
    price: 494.99,
    item_image: "/images/suspension/suspension6.webp",
    delivery_date: "Saturday, Jan 18",
  },
  {
    _id: 7,
    slug: "suspension",
    title: {
      subtitle:
        'Rough Country 3.5" Lift Kit | Lifted Struts | N3 Shocks (19-24 Chevy Silverado 1500 | 2WD/4WD | Gas)',
    },
    price: 849.95,
    item_image: "/images/suspension/suspension7.webp",
    delivery_date: "Saturday, Jan 18",
  },
  {
    _id: 8,
    slug: "suspension",
    title: {
      subtitle: 'Rough Country Air Spring Spacers | 6"',
    },
    price: 69.95,
    item_image: "/images/suspension/suspension8.webp",
    delivery_date: "Saturday, Jan 18",
  },
  // Add more products as needed
];

const SuspensionCategory: React.FC = () => {
  return (
    <>
      <div className="w-full max-w-[1450px] flex flex-col md:flex-row gap-6 px-4 py-6 mx-auto">
        <div className="w-full md:hidden">
          <SidebarFilters>
            <SuspensionFilters />
          </SidebarFilters>
        </div>
        <div className="hidden md:flex flex-col gap-3 md:w-[400px] h-full">
          <SuspensionYMMFilters />
          <SuspensionFilters />
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
                  <Item href={"/collections/product-category/suspension"}>
                    Suspension
                  </Item>
                </Breadcrumb>
              </div>
              <div
                className={
                  "w-full flex flex-row flex-wrap gap-8 justify-center bg-gray-200 py-6"
                }
              >
                {productData.map((product) => (
                  <SuspensionCard product={product} key={product._id} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SuspensionCategory;
