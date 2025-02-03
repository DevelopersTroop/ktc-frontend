"use client";
import React from "react";
import DashbaordTopbar from "./_components/dashbaord-topbar";
import DashboardBreadcrumb from "./_components/dashboard-breadcrumb";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardBreadcrumb />
      <div className="flex flex-col w-full gap-7 pt-6 mb-16">
        <div className={"w-full "}>
          <DashbaordTopbar />
        </div>
        <div className={"w-full px-4"}>{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
