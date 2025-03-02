"use client";
import React from "react";
import DashbaordTopbar from "./_components/dashbaord-topbar";
import DashboardBreadcrumb from "./_components/dashboard-breadcrumb";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <DashboardBreadcrumb />
      <div className="mb-16 flex w-full flex-col pt-6">
        <div className={"w-full"}>
          <DashbaordTopbar />
        </div>
        <div className={"w-full"}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
