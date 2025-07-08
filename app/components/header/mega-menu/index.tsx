import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import navMenus from "./nav";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Navbar Component
// This component renders the main navigation bar with support for mega menus and dropdowns
export default function Navbar({ isHomePage }: { isHomePage: boolean }) {
  // State to manage the currently open menu
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // State to manage the currently hovered submenu
  const [hovering, setHovering] = useState<string | null>(null);

  // State to manage a timeout for closing submenus
  const [submenuTimeout, setSubmenuTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Function to handle mouse enter on a menu item
  const handleMouseEnter = (menu: string) => {
    if (submenuTimeout) clearTimeout(submenuTimeout);
    setOpenMenu(menu);
  };

  // Function to handle mouse leave on a menu item
  const handleMouseLeave = () => {
    setSubmenuTimeout(setTimeout(() => setOpenMenu(null), 400)); // Slight delay before disappearing
  };

  return (
    <nav className={cn("bg-transparent w-full", isHomePage && "text-white flex w-full justify-between")}>
      {/* Navigation menu list */}
      <ul className="flex space-x-6 p-4 items-center">
        {navMenus.filter((m) => m.label !== "RESOURCES")?.map((menu) => (
          <li
            key={menu.label}
            onMouseEnter={() => handleMouseEnter(menu.label)}
            onMouseLeave={handleMouseLeave}
            className={cn(menu.meagMenu ? "" : "relative")}
          >
            {/* Menu link */}
            <Link
              target={menu.target}
              href={menu.href}
              className={cn(
                "p-2 flex items-center transition-all duration-300 hover:bg-primary font-semibold",
                isHomePage && "hover:text-white "
                //after:bg-transparent hover:underline
              )}
            >
              {menu.label} {/* Menu label */}
              {menu.children &&
                (openMenu === menu.label ? (
                  <ChevronUp className="ml-2 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-2 w-4 h-4" />
                ))}
            </Link>

            {/* Mega Menu */}
            {menu.meagMenu && (
              <div
                className={cn(
                  "absolute inset-x-0 top-[100%] text-black bg-gray-600 p-8 pt-2  grid grid-cols-7 shadow-lg transition-opacity duration-300 z-50 uppercase",
                  openMenu === menu.label
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                )}
              >
                {menu.children?.map((submenu) => (
                  <div
                    key={submenu.label}
                    className="relative w-full border-primary px-2 last:border-r-0 border-r-black border-r-[2px]"
                  >
                    {/* Submenu link */}
                    <Link
                      href={submenu.href}
                      className="text-lg font-semibold flex items-center justify-center transition-all duration-300 hover:bg-gray-700 bg-gray-500 text-white px-2 py-1 text-center w-full"
                    >
                      {submenu.label}
                    </Link>
                    {/* Nested submenu */}
                    {submenu.children && (
                      <div className="w-full bg-transparent text-white transition-opacity duration-300">
                        {submenu.children.map((subsub) => (
                          <Link
                            key={subsub.label}
                            href={subsub.href}
                            className={cn(
                              "text-base flex items-center py-2 transition-all duration-300",
                              subsub.label === "Wheels" ||
                                subsub.label === "Wheel Accessories"
                                ? "hover:bg-gray-700 bg-gray-500 text-white px-2 py-1 font-semibold text-center flex justify-center mt-2"
                                : "hover:bg-primary hover:text-white text-[14px]"
                            )}
                          >
                            {subsub.label}
                          </Link>
                        ))}
                        {submenu.children
                          .find(
                            (s) =>
                              s.label === "Wheels" ||
                              s.label === "Wheel Accessories"
                          )
                          ?.children?.map((subsub) => (
                            <Link
                              key={subsub.label}
                              href={subsub.href}
                              className={cn(
                                "text-[14px] font-normal flex items-center py-2 transition-all duration-300 relative hover:bg-primary hover:text-white",
                                subsub.label === "Wheels"
                                  ? "hover:bg-gray-700 bg-gray-500 text-white px-2 py-1 font-semibold "
                                  : ""
                              )}
                            >
                              {subsub.label}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Normal Dropdown */}
            {!menu.meagMenu && menu.children && (
              <div
                className={cn(
                  "absolute top-full left-0  bg-gray-600 text-white w-56 py-4 shadow-lg transition-opacity duration-300",
                  openMenu === menu.label
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                )}
              >
                {menu.children.map((submenu) => (
                  <div
                    key={submenu.label}
                    className="relative"
                    onMouseEnter={() => setHovering(submenu.label)}
                    onMouseLeave={() => setHovering(null)}
                  >
                    {/* Submenu link */}
                    <Link
                      href={submenu.href}
                      className="flex items-center py-2 px-4 transition-all duration-300 hover:bg-primary"
                    >
                      {submenu.label}
                      {submenu.children && (
                        <ChevronRight className="ml-2 w-4 h-4" />
                      )}
                    </Link>
                    {/* Third-Level Submenu */}
                    {submenu.children && (
                      <div
                        className={cn(
                          "absolute left-full top-0 w-56 bg-white p-4 shadow-md transition-opacity duration-300",
                          hovering === submenu.label
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                        )}
                      >
                        {submenu.children.map((subsub) => (
                          <Link
                            key={subsub.label}
                            href={subsub.href}
                            className="block py-2 transition-all duration-300 hover:text-primary relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                          >
                            {subsub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <ul className="flex space-x-6 p-4 items-start">
        {navMenus.filter((m) => m.label === "RESOURCES").map((menu) => (
          <li
            key={menu.label}
            onMouseEnter={() => handleMouseEnter(menu.label)}
            onMouseLeave={handleMouseLeave}
            className={cn(menu.meagMenu ? "" : "relative")}
          >
            {/* Menu link */}
            <Link
              target={menu.target}
              href={menu.href}
              className={cn(
                "p-2 flex items-center transition-all duration-300 hover:bg-primary font-semibold",
                isHomePage && "hover:text-white "
                //after:bg-transparent hover:underline
              )}
            >
              {menu.label} {/* Menu label */}
              {menu.children &&
                (openMenu === menu.label ? (
                  <ChevronUp className="ml-2 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-2 w-4 h-4" />
                ))}
            </Link>

            {/* Normal Dropdown */}
            {!menu.meagMenu && menu.children && (
              <div
                className={cn(
                  "absolute top-full left-0  bg-gray-600 text-white w-56 py-4 shadow-lg transition-opacity duration-300",
                  openMenu === menu.label
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                )}
              >
                {menu.children.map((submenu) => (
                  <div
                    key={submenu.label}
                    className="relative"
                    onMouseEnter={() => setHovering(submenu.label)}
                    onMouseLeave={() => setHovering(null)}
                  >
                    {/* Submenu link */}
                    <Link
                      href={submenu.href}
                      className="flex items-center py-2 px-4 transition-all duration-300 hover:bg-primary"
                    >
                      {submenu.label}
                      {submenu.children && (
                        <ChevronRight className="ml-2 w-4 h-4" />
                      )}
                    </Link>
                    {/* Third-Level Submenu */}
                    {submenu.children && (
                      <div
                        className={cn(
                          "absolute left-full top-0 w-56 bg-white p-4 shadow-md transition-opacity duration-300",
                          hovering === submenu.label
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                        )}
                      >
                        {submenu.children.map((subsub) => (
                          <Link
                            key={subsub.label}
                            href={subsub.href}
                            className="block py-2 transition-all duration-300 hover:text-primary relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                          >
                            {subsub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
