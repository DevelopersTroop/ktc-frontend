"use client";
import { lockMenu } from "@/app/globalRedux/features/menu/menu-slice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const DesktopMenuLink = ({
  children,
  href,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  [prop: string]: string | React.ReactNode;
}) => {
  const dispatch = useDispatch();
  return (
    <Link onClick={() => dispatch(lockMenu())} href={href} {...props}>
      {children}
    </Link>
  );
};

export default DesktopMenuLink;
