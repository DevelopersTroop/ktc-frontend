"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DashbaordTopbar = () => {
  const [selectedNav, setSelectedNav] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname.split("/")[2];
    setSelectedNav(path);
  }, [pathname]);
  return (
    <ul className="w-full flex flex-row justify-around flex-wrap text-base border">
      <li>
        <Link
          href={"/dashboard/garage"}
          className={`cursor-pointer py-4 block font-semibold text-nowrap border-r ${
            selectedNav === "garage" ? "text-primary " : "text-black"
          } px-2 sm:px-5 py-2 hover:text-primary`}
        >
          Garage{" "}
        </Link>
      </li>
      <li>
        <Link
          href={"/dashboard/orders"}
          className={`cursor-pointer py-4 block font-semibold border-r  ${
            selectedNav === "orders" ? "text-primary" : "text-black"
          } px-2 sm:px-5 py-2 hover:text-primary`}
        >
          Orders{" "}
        </Link>
      </li>
      <li>
        <Link
          href={"/dashboard/save-product"}
          className={`cursor-pointer py-4 block font-semibold text-nowrap border-r ${
            selectedNav === "downloads" ? "text-primary " : "text-black"
          } px-2 sm:px-5 py-2 hover:text-primary`}
        >
          Wishlist
        </Link>
      </li>
      {/* <li>
        <Link
          href={"/dashboard/downloads"}
          className={`cursor-pointer py-4 block font-semibold text-nowrap border-r ${
            selectedNav === "downloads" ? "text-primary " : "text-black"
          } px-2 sm:px-5 py-2 hover:text-primary`}
        >
          Downloads{" "}
        </Link>
      </li> */}
      <li>
        <Link
          href={"/dashboard/addresses"}
          className={`cursor-pointer py-4 block font-semibold border-r ${
            selectedNav === "addresses" ? "text-primary" : "text-black"
          } px-2 sm:px-5 py-2 hover:text-primary`}
        >
          Addresses{" "}
        </Link>
      </li>
      <li>
        <Link
          href={"/dashboard/account-details"}
          className={`cursor-pointer py-4 block font-semibold border-r  ${
            selectedNav === "account-details" ? "text-primary" : "text-black"
          } px-2 sm:px-5 py-2 hover:text-primary`}
        >
          Account details{" "}
        </Link>
      </li>
      <li>
        <Link
          href={"/dashboard/change-password"}
          className={`cursor-pointer py-4 block font-semibold border-r ${
            selectedNav === "change-password" ? "text-primary" : "text-black"
          } px-2 sm:px-5 py-2 hover:text-primary`}
        >
          Change password{" "}
        </Link>
      </li>
      <li>
        <Link
          href={"/dashboard/logout"}
          className={`cursor-pointer py-4 block font-semibold  ${
            selectedNav === "logout" ? "text-primary" : "text-black"
          } px-2 sm:px-5 py-2 hover:text-primary`}
        >
          Log out{" "}
        </Link>
      </li>
    </ul>
  );
};

export default DashbaordTopbar;
