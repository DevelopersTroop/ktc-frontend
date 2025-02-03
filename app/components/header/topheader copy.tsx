"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Phone, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TopHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-white border-b">
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          <div className="flex items-center p-4 gap-2">
            <Input
              type="text"
              placeholder="Search products..."
              className="flex-1"
            />
            <Button variant="ghost" onClick={() => setIsSearchOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="min-[1160px]:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/shop" className="text-lg font-medium">
                    Shop
                  </Link>
                  <Link href="/vehicles" className="text-lg font-medium">
                    Vehicles
                  </Link>
                  <Link href="/brands" className="text-lg font-medium">
                    Brands
                  </Link>
                  <Link href="/contact" className="text-lg font-medium">
                    Contact
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/logo.jpeg"
              alt="Custom Offsets"
              className="h-8 md:h-16"
            />
          </Link>

          <div className="hidden lg:flex flex-1 max-w-xl mx-4">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search wheels, tires, or vehicles..."
                className="w-full pl-4 pr-10"
              />
              <Button
                className="absolute right-0 top-0 bottom-0 px-3"
                variant="ghost"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-6 w-6" />
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Phone className="h-5 w-5 text-gray-600" />
            <div>
              <a
                href="tel:(920) 806-0024"
                className="text-sm font-medium hover:text-blue-600"
              >
                (920) 806-0024
              </a>
              <p className="text-xs text-gray-500">Need Help?</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">MY ACCOUNT</p>
                <p className="text-xs text-gray-500">Hello, Sign In</p>
              </div>
            </Link>

            <Link href="/cart" className="relative flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">MY CART</p>
                <p className="text-xs text-gray-500">$0.00</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link href="/account">
              <User className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
