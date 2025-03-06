import DesktopMenuLink from "./menu/desktop-menu-link/desktop-menu-link";
import DesktopMenu from "./menu/desktop-menu/desktop-menu";

import { MdKeyboardArrowDown } from "react-icons/md";
import MenuItemHasChildren from "./menu/menu-item-has-children/menu-item-has-children";

const MainMenu = () => {
  return (
    <nav className={"flex h-full w-full justify-between"}>
      <ul className={"flex h-full items-center"}>
        <MenuItemHasChildren>
          <DesktopMenuLink
            className={
              "mt-[] flex h-full items-center px-6 text-[15px] font-bold uppercase text-white duration-500 hover:bg-primary hover:underline"
            }
            href="/collections/product-category/wheels"
          >
            Shop <MdKeyboardArrowDown className="text-2xl" />
          </DesktopMenuLink>
          <DesktopMenu className="absolute w-44 bg-gray-700">
            <ul className="filter-shadow flex flex-col items-start text-[15px] text-white">
              <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/collections/product-category/wheels"
                >
                  Wheels
                </DesktopMenuLink>
              </li>
              <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/collections/product-category/tires"
                >
                  Tires
                </DesktopMenuLink>
              </li>
              {/* <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/collections/product-category/suspension"
                >
                  Suspension
                </DesktopMenuLink>
              </li> */}
              <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/collections/product-category/accessories"
                >
                  Accessories
                </DesktopMenuLink>
              </li>
            </ul>
          </DesktopMenu>
        </MenuItemHasChildren>

        <li className={"h-full px-6 text-center duration-500 hover:bg-primary"}>
          <DesktopMenuLink
            className={
              "mt-[] flex h-full items-center text-[15px] font-bold uppercase text-white hover:underline"
            }
            href="/add-login"
          >
            Add My Truck
          </DesktopMenuLink>
        </li>

        <li className={"h-full px-6 text-center duration-500 hover:bg-primary"}>
          <DesktopMenuLink
            className={
              "mt-[] flex h-full items-center text-[15px] font-bold uppercase text-white hover:underline"
            }
            href="/ktc-audio-gallery"
          >
            Search Gallery
          </DesktopMenuLink>
        </li>

        <MenuItemHasChildren>
          <DesktopMenuLink
            className={
              "mt-[] flex h-full items-center px-6 text-[15px] font-bold uppercase text-white duration-500 hover:bg-primary hover:underline"
            }
            href="#"
          >
            Brands <MdKeyboardArrowDown className="text-2xl" />
          </DesktopMenuLink>
          <DesktopMenu className="absolute w-44 bg-gray-700">
            <ul className="filter-shadow flex flex-col items-start text-[15px] text-white">
              <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/collections/product-category/wheels"
                >
                  Wheels
                </DesktopMenuLink>
              </li>
              <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/collections/product-category/tires"
                >
                  Tires
                </DesktopMenuLink>
              </li>
              {/* <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/collections/product-category/suspension"
                >
                  Suspension
                </DesktopMenuLink>
              </li> */}
              <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/collections/product-category/accessories"
                >
                  Accessories
                </DesktopMenuLink>
              </li>
              {/* <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="#"
                >
                  View All
                </DesktopMenuLink>
              </li> */}
            </ul>
          </DesktopMenu>
        </MenuItemHasChildren>
      </ul>
      <div className="flex h-full items-start">
        <MenuItemHasChildren>
          <DesktopMenuLink
            className={
              "flex h-full items-center px-6 text-[15px] font-bold uppercase text-white duration-500 hover:bg-primary hover:underline"
            }
            href="#"
          >
            Resources <MdKeyboardArrowDown className="text-2xl" />
          </DesktopMenuLink>
          <DesktopMenu className="absolute w-44 bg-gray-700">
            <ul className="filter-shadow flex flex-col items-start text-[15px] text-white">
              <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/about"
                >
                  About Us
                </DesktopMenuLink>
              </li>
              <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/track-order"
                >
                  Track Your Order
                </DesktopMenuLink>
              </li>
              <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="#"
                >
                  Videos
                </DesktopMenuLink>
              </li>
              <li className="inline-block w-full text-left">
                <DesktopMenuLink
                  className={
                    "hidden w-full px-2.5 py-4 font-medium uppercase hover:bg-primary group-hover:inline-block"
                  }
                  href="/contact"
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
