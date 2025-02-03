import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"max-w-[1150px] mx-auto w-full px-2 md:px-16 py-6"}>
      {children}
    </div>
  );
};

export default Container;
