"use client";
import { metaDataHelper } from "@/app/utils/metadata";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import React, { useState } from "react";
import SidebarFilters from "../collections/product-category/[categorySlug]/_filters/mobile-filters/sidebar-filters";
import { CreateGalleryModal } from "./components/CreateGalleryModal";
import GalleryFilters from "./components/filters/gallery-filters";
import Gallery from "./components/gallery";

export async function generateMetadata(): Promise<Metadata> {
  try {
    return {
      ...metaDataHelper({
        title: `KTC Audio Gallery - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/ktc-audio-gallery`,
      },
    };
  } catch (error) {
    // Return default metadata in case of error
    return {
      title: "Error",
    };
  }
}

const KtcAudioGalleryPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div className="w-full text-center text-2xl py-4">
        <h1>Largest Gallery of Custom Trucks</h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-5 p-4">
        <div className="md:hidden">
          <SidebarFilters>
            <GalleryFilters />
          </SidebarFilters>
          <Button onClick={() => setOpen(true)}>Submit your gallery</Button>
        </div>
        <div className="hidden md:flex flex-col gap-3 md:w-[400px] h-full max-w-[300px]">
          {/* <GalleryYMMFilters /> */}
          <GalleryFilters />
          <Button onClick={() => setOpen(true)}>Submit your gallery</Button>
        </div>
        <Gallery />
      </div>
      <CreateGalleryModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default KtcAudioGalleryPage;
