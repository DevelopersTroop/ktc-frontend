"use client";
import { useTypedSelector } from "@/app/globalRedux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { Phone, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import MobileMenu from "./menu/mobile-menu/mobile-menu";
import HeaderSearchButton from "./search/search";

export default function TopHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();
  const { products } = useTypedSelector((state) => state.persisted.cart);

  const cartQuantity = useMemo(() => {
    return Object.values(products).reduce(
      (acc, product) => acc + product.quantity,
      0,
    );
  }, [JSON.stringify(products)]);

  return (
    <div className="border-b bg-white">
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex items-center gap-2 p-4">
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

      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <MobileMenu />

          <Link href="/" className="flex-shrink-0">
            <img
              src="/images/logo.jpeg"
              alt="Custom Offsets"
              className="h-8 md:h-16"
            />
          </Link>

          {/* <div className="mx-4 hidden max-w-xl flex-1 lg:flex">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search wheels, tires, or vehicles..."
                className="w-full pl-4 pr-10"
              />
              <Button
                className="absolute bottom-0 right-0 top-0 px-3"
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
          </Button> */}
          <HeaderSearchButton />

          <div className="hidden items-center gap-2 md:flex">
            <Phone className="h-5 w-5 text-gray-600" />
            <div>
              <a
                href="tel:(920) 806-0024"
                className="text-sm font-medium hover:text-blue-600"
              >
                +1 (303) 695-6305
              </a>
              <p className="text-xs text-gray-500">Need Help?</p>
            </div>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href={user?.email ? "/dashboard" : "/login"}
              className="flex items-center gap-2"
            >
              <User className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">MY ACCOUNT</p>
                <p className="text-xs text-gray-500">
                  Hello, {user?.email ? user.email : "Login"}{" "}
                </p>
              </div>
            </Link>

            <Link href="/cart" className="relative flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {cartQuantity}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">MY CART</p>
                {/* <p className="text-xs text-gray-500">$0.00</p> */}
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link href={user?.email ? "/dashboard" : "/login"}>
              <User className="h-6 w-6 text-gray-600" />
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                {cartQuantity}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
