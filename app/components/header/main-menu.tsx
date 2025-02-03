import DesktopMenuLink from "./menu/desktop-menu-link/desktop-menu-link";
import DesktopMenu from "./menu/desktop-menu/desktop-menu";

import { MdKeyboardArrowDown } from "react-icons/md";
import MenuItemHasChildren from "./menu/menu-item-has-children/menu-item-has-children";

const MainMenu = () => {
  return (
    <nav className={"w-full flex justify-between h-full"}>
      <ul className={"flex items-center h-full"}>
        <MenuItemHasChildren>
          <DesktopMenuLink
            className={
              "mt-[] h-full flex items-center text-white font-bold uppercase text-[15px] hover:underline hover:bg-emerald-500 px-6 duration-500"
            }
            href="/collections/product-category/wheels"
          >
            Shop <MdKeyboardArrowDown className="text-2xl" />
          </DesktopMenuLink>
          <DesktopMenu className="absolute w-44 bg-gray-700">
            <ul className="flex flex-col  items-start filter-shadow text-[15px] text-white">
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium  px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="/collections/product-category/wheels"
                >
                  Wheels
                </DesktopMenuLink>
              </li>
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="/collections/product-category/tires"
                >
                  Tires
                </DesktopMenuLink>
              </li>
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="/collections/product-category/suspension"
                >
                  Suspension
                </DesktopMenuLink>
              </li>
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="/collections/product-category/accessories"
                >
                  Accessories
                </DesktopMenuLink>
              </li>
            </ul>
          </DesktopMenu>
        </MenuItemHasChildren>

        <li
          className={
            "h-full text-center hover:bg-emerald-500 px-6 duration-500"
          }
        >
          <DesktopMenuLink
            className={
              "mt-[] h-full flex items-center text-white font-bold uppercase text-[15px] hover:underline"
            }
            href="/add-login"
          >
            Add My Truck
          </DesktopMenuLink>
        </li>

        <li
          className={
            "h-full text-center hover:bg-emerald-500 px-6 duration-500"
          }
        >
          <DesktopMenuLink
            className={
              "mt-[] h-full flex items-center text-white font-bold uppercase text-[15px] hover:underline"
            }
            href="/ktc-audio-gallery"
          >
            Search Gallery
          </DesktopMenuLink>
        </li>

        <MenuItemHasChildren>
          <DesktopMenuLink
            className={
              "mt-[] h-full flex items-center text-white font-bold uppercase text-[15px] hover:underline hover:bg-emerald-500 px-6 duration-500"
            }
            href="#"
          >
            Brands <MdKeyboardArrowDown className="text-2xl" />
          </DesktopMenuLink>
          <DesktopMenu className="absolute w-44 bg-gray-700">
            <ul className="flex flex-col  items-start filter-shadow text-[15px] text-white">
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium  px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="/collections/product-category/wheels"
                >
                  Wheels
                </DesktopMenuLink>
              </li>
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="/collections/product-category/tires"
                >
                  Tires
                </DesktopMenuLink>
              </li>
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="/collections/product-category/suspension"
                >
                  Suspension
                </DesktopMenuLink>
              </li>
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium px-2.5 py-4 uppercase hover:bg-green-400"
                  }
                  href="/collections/product-category/accessories"
                >
                  Accessories
                </DesktopMenuLink>
              </li>
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="#"
                >
                  View All
                </DesktopMenuLink>
              </li>
            </ul>
          </DesktopMenu>
        </MenuItemHasChildren>
      </ul>
      <div className="flex h-full items-start">
        <MenuItemHasChildren>
          <DesktopMenuLink
            className={
              "-mt-6 h-full flex items-center text-white font-bold uppercase text-[15px] hover:underline hover:bg-emerald-500 px-6 duration-500"
            }
            href="#"
          >
            Resources <MdKeyboardArrowDown className="text-2xl" />
          </DesktopMenuLink>
          <DesktopMenu className="absolute w-44 bg-gray-700">
            <ul className="flex flex-col  items-start filter-shadow text-[15px] text-white">
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium  px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="/about"
                >
                  About Us
                </DesktopMenuLink>
              </li>
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="/track-order"
                >
                  Track Your Order
                </DesktopMenuLink>
              </li>
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="#"
                >
                  Videos
                </DesktopMenuLink>
              </li>
              <li className="w-full inline-block text-left">
                <DesktopMenuLink
                  className={
                    "w-full hidden group-hover:inline-block font-medium px-2.5 py-4 uppercase hover:bg-emerald-500"
                  }
                  href="/contact-us"
                >
                  Contact
                </DesktopMenuLink>
              </li>
            </ul>
          </DesktopMenu>
        </MenuItemHasChildren>
      </div>
    </nav>
  );
};

export default MainMenu;
