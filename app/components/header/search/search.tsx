"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SearchIcon, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import SearchSuggestion from "./search-suggestion";

interface HeaderSearchButtonProps {
  isHomepage: boolean;
  "aria-label"?: string;
}

const HeaderSearchButton: React.FC<HeaderSearchButtonProps> = ({
  isHomepage,
  "aria-label": ariaLabel,
}) => {
  const [open, setOpen] = React.useState(false);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const searchInput = watch("search");

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      const input = document.querySelector(
        'input[name="search"]'
      ) as HTMLInputElement | null;
      input?.focus();
    } else {
      document.body.style.overflow = "auto";
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const onSubmit = (data: { search: string }) => {
    // Add your search submit logic here
    console.log("Search submitted:", data.search.trim());
  };

  return (
    <>
      {/* FULLSCREEN SEARCH OVERLAY (for all devices when open) */}
      {open && (
        <div>
          {/* Background overlay */}
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-900/20 border-none cursor-default h-screen w-full fixed top-0 left-0 overflow-hidden"
            aria-label="Close search overlay"
          ></button>

          {/* Search bar container */}
          <div className="bg-white h-20 z-[150] fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl">
            <form
              className="h-full flex items-center border-b border-gray-300"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full h-full">
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Search Wheel"
                      className="px-10 font-medium bg-white text-2xl h-full border-none focus:outline-none w-full"
                      aria-label="Search for wheels and products"
                    />
                  )}
                />
              </div>

              {/* Buttons */}
              <div className="w-max h-full px-10 flex gap-4 items-center">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-full flex items-center"
                  aria-label="Close search"
                >
                  <X className="text-3xl h-full text-btext" />
                </button>
                <button
                  type="submit"
                  className="h-full flex items-center"
                  aria-label="Submit search"
                >
                  <SearchIcon className="text-3xl h-full text-black" />
                </button>
              </div>
            </form>

            {/* Suggestions */}
            <SearchSuggestion setOpen={setOpen} searchInput={searchInput} />
          </div>
        </div>
      )}

      {/* HEADER SEARCH AREA */}
      <div className="h-full flex items-center">
        <form className="h-full flex items-center w-full">
          {/* DESKTOP SEARCH BAR */}
          <div className="mx-4 hidden max-w-xl flex-1 lg:flex">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search wheels"
                className="w-full pl-4 pr-10"
              />
              <Button
                type="submit"
                className="absolute bottom-0 right-0 top-0 px-3"
                variant="ghost"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* MOBILE SEARCH ICON BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            aria-label={ariaLabel || "Open mobile search"}
          >
            <Search className="h-8 w-8 text-3xl" />
          </Button>
        </form>
      </div>
    </>
  );
};

export default HeaderSearchButton;
