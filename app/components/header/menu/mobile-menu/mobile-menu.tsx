"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";

const MobileMenu = () => {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [open , setIsOpen] = useState(false);

  const handleSheetClose = () => {
    setIsOpen(false);
  }


  return (
    <div className="block min-[1160px]:hidden">
      <Sheet open={open} onOpenChange={setIsOpen}>
        <div>
          <MdOutlineMenu onClick={()=> setIsOpen(!open)} className="text-3xl text-gray-800" />
        </div>
        <SheetContent side="left" className="bg-gray-100 w-[85%]">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <ScrollArea className="w-full h-full px-2">
            <div className="flex flex-col gap-4 mt-8 uppercase">
              <div className="">
                <button
                  onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                  className="flex justify-between text-start w-full"
                >
                  <span className="text-2xl font-bold text-gray-800 border-t border-primary pt-2 uppercase">
                    Shop
                  </span>
                  <svg
                    className={`fill-black shrink-0 ml-8 transform transition duration-200 ease-out ${
                      isShopDropdownOpen ? "rotate-180" : ""
                    }`}
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className={`transition-all duration-200 ${
                        isShopDropdownOpen ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className="transform origin-center rotate-90"
                    />
                  </svg>
                </button>
                {isShopDropdownOpen && (
                  <div className="">
                    <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        onClick={handleSheetClose}
                        href="/collections/product-category/wheels"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Wheels
                      </Link>
                    </div>
                    <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        onClick={handleSheetClose}
                        href="/collections/product-category/tires"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Tires
                      </Link>
                    </div>

                    {/* <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        href="/collections/product-category/suspensions"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Suspension
                      </Link>
                    </div> */}
                    <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        onClick={handleSheetClose}
                        href="/collections/product-category/accessories"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Accessories
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="w-[70px] pb-2 border-t border-primary "></div>
                <Link
                onClick={handleSheetClose}
                  href="/add-login"
                  className="text-2xl font-bold text-gray-800"
                >
                  Add My Vehicle
                </Link>
              </div>
         
              <div>
                <div className="w-[70px] pb-2 border-t border-primary "></div>
                <Link
                  onClick={handleSheetClose}
                  href="/ktc-audio-gallery"
                  className="text-2xl font-bold text-gray-800"
                >
                  Search Gallery
                </Link>
              </div>

              <div className="">
                <button
                  onClick={() => setIsBrandsDropdownOpen(!isBrandsDropdownOpen)}
                  className="flex justify-between text-start w-full"
                >
                  <span className="text-2xl font-bold text-gray-800 border-t border-primary pt-2 uppercase">
                    Brands
                  </span>
                  <svg
                    className={`fill-black shrink-0 ml-8 transform transition duration-200 ease-out ${
                      isBrandsDropdownOpen ? "rotate-180" : ""
                    }`}
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className={`transition-all duration-200 ${
                        isBrandsDropdownOpen ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className="transform origin-center rotate-90"
                    />
                  </svg>
                </button>
                {isBrandsDropdownOpen && (
                  <div className="">
                    <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        onClick={handleSheetClose}
                        href="/collections/product-category/wheels"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Wheels
                      </Link>
                    </div>
                    <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        onClick={handleSheetClose}
                        href="/collections/product-category/tires"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Tires
                      </Link>
                    </div>

                    {/* <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        href="/collections/product-category/suspensions"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Suspension
                      </Link>
                    </div> */}
                    <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        onClick={handleSheetClose}
                        href="/collections/product-category/accessories"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Accessories
                      </Link>
                    </div>
                    {/* <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        href="/collections/product-category/wheels"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        View All
                      </Link>
                    </div> */}
                  </div>
                )}
              </div>

              <div className="">
                <button
                  onClick={() =>
                    setIsResourcesDropdownOpen(!isResourcesDropdownOpen)
                  }
                  className="flex justify-between text-start w-full"
                >
                  <span className="text-2xl font-bold text-gray-800 border-t border-primary pt-2 uppercase">
                    Resources
                  </span>
                  <svg
                    className={`fill-black shrink-0 ml-8 transform transition duration-200 ease-out ${
                      isResourcesDropdownOpen ? "rotate-180" : ""
                    }`}
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className={`transition-all duration-200 ${
                        isResourcesDropdownOpen ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className="transform origin-center rotate-90"
                    />
                  </svg>
                </button>
                {isResourcesDropdownOpen && (
                  <div className="">
                    <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        onClick={handleSheetClose}
                        href="/about"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        About Us
                      </Link>
                    </div>
                    <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        onClick={handleSheetClose}
                        href="/track-order"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Track Your Order
                      </Link>
                    </div>

                    <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        onClick={handleSheetClose}
                        href="#"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Videos
                      </Link>
                    </div>
                    <div className="pl-12 py-2">
                      <div className="w-[70px] pt-1 border-t border-primary "></div>
                      <Link
                        onClick={handleSheetClose}
                        href="/contact"
                        className="block text-2xl font-semibold text-gray-800"
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;