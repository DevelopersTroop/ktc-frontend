"use client";
import React from "react";
import SidebarFilters from "../collections/product-category/[categorySlug]/_filters/mobile-filters/sidebar-filters";
import GalleryFilters from "./components/filters/gallery-filters";
import GalleryYMMFilters from "./components/filters/gallery-ymm-filter";
import Gallery from "./components/gallery";

const KtcAudioGalleryPage: React.FC = () => {
  return (
    <div className="">
      <div className="w-full text-center text-2xl py-4">
        <h1>Largest Gallery of Custom Trucks</h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-5 p-4">
        <div className="w-full md:hidden">
          <SidebarFilters>
            <GalleryFilters />
          </SidebarFilters>
        </div>
        <div className="hidden md:flex flex-col gap-3 md:w-[400px] h-full">
          <GalleryYMMFilters />
          <GalleryFilters />
        </div>
        <Gallery />
      </div>
    </div>
  );
};

export default KtcAudioGalleryPage;
