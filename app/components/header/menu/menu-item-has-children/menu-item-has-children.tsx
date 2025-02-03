"use client";
import { unlockMenu } from "@/app/globalRedux/features/menu/menu-slice";
import { RootState } from "@/app/globalRedux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const MenuItemHasChildren = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isMenuLock } = useSelector((state: RootState) => state.menu);
  return (
    <li
      onMouseOver={() => isMenuLock && dispatch(unlockMenu())}
      className={"h-full group text-center "}
    >
      {children}
    </li>
  );
};

export default MenuItemHasChildren;
