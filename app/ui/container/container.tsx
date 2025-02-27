import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={"container mx-auto w-full px-4 py-6"}>{children}</div>;
};

export default Container;
