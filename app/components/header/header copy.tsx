"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const menuItems = {
  shop: [
    { title: "Wheels", href: "/collections/product-category/wheels" },
    { title: "Tires", href: "/collections/product-category/tires" },
    { title: "Suspension", href: "/collections/product-category/suspension" },
    { title: "Lift Kits", href: "/lift-kits" },
    { title: "Accessories", href: "/collections/product-category/accessories" },
  ],
  brands: [
    { title: "Anthem", href: "/brands/anthem" },
    { title: "Fuel", href: "/brands/fuel" },
    { title: "Method", href: "/brands/method" },
    { title: "TIS", href: "/brands/tis" },
  ],
  resources: [
    { title: "Gallery", href: "/gallery" },
    { title: "Blog", href: "/blog" },
    { title: "Videos", href: "/videos" },
    { title: "About Us", href: "/about" },
    { title: "Track Your Order", href: "/track-order" },
    { title: "Contact", href: "/contact-us" },
  ],
};

export default function Header() {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="hidden lg:flex items-center h-14">
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 hover:bg-gray-800 inline-flex items-center">
              SHOP <ChevronDown className="ml-2 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {menuItems.shop.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link href={item.href} className="w-full uppercase">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/add-login" className="px-4 py-2 hover:bg-gray-800">
            ADD MY TRUCK
          </Link>

          <Link
            href="/ktc-audio-gallery"
            className="px-4 py-2 hover:bg-gray-800"
          >
            SEARCH GALLERY
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 hover:bg-gray-800 inline-flex items-center">
              BRANDS <ChevronDown className="ml-2 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {menuItems.brands.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link href={item.href} className="w-full uppercase">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 hover:bg-gray-800 inline-flex items-center">
              RESOURCES <ChevronDown className="ml-2 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {menuItems.resources.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link href={item.href} className="w-full uppercase">
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
