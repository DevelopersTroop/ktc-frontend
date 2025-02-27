"use client";
import { GProduct } from "@/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import React from "react";
import NoProductsFound from "../../collections/product-category/[categorySlug]/no-products-found";
import GalleryTopFilter from "./filters/gallery_top_filter";
import ProductCard from "./product-card";

const products: GProduct[] = [
  {
    id: 1,
    slug: "gallery-1",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image1.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
  {
    id: 2,
    slug: "gallery-2",
    ymm: {
      title: "2024 Ford",
      model: "F-150 STX",
    },
    image: "/images/gallery/image2.jpeg",
    wheel: {
      title: "Fuel Catalyst",
      size: "20x9 1mm",
    },
    tire: {
      title: "Falken Wildpeak At4W",
      size: '35" x 11.5"',
    },
  },
  {
    id: 3,
    slug: "gallery-3",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image3.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
  {
    id: 4,
    slug: "gallery-4",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image4.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
  {
    id: 5,
    slug: "gallery-5",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image5.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
  {
    id: 6,
    slug: "gallery-6",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image6.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
  {
    id: 7,
    slug: "gallery-7",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image7.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
  {
    id: 8,
    slug: "gallery-8",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image8.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
  {
    id: 9,
    slug: "gallery-9",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image9.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
  {
    id: 10,
    slug: "gallery-10",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image10.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
  {
    id: 11,
    slug: "gallery-11",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image11.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
  {
    id: 12,
    slug: "gallery-12",
    ymm: {
      title: "2025 Chevrolet",
      model: "Silverado 2500 HD LT",
    },
    image: "/images/gallery/image12.jpeg",
    wheel: {
      title: "Fuel Assault",
      size: "18x9 20mm",
    },
    tire: {
      title: "Cooper Discoverer S/t Maxx",
      size: "295/70R18",
    },
  },
];

const Gallery: React.FC = () => {
  return (
    <>
      {products.length === 0 ? (
        <>
          <NoProductsFound />
        </>
      ) : (
        <>
          <div className="w-full flex-col">
            <div className="w-full flex flex-row flex-wrap">
              <div className="p-2">
                <Breadcrumb>
                  <Item href={"/"}>Home</Item>
                  <Item href={"/"}>ktc-audio-gallery</Item>
                </Breadcrumb>
              </div>
              <GalleryTopFilter />
            </div>
            <div className="w-full flex flex-row flex-wrap gap-5 p-4 justify-center">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Gallery;
