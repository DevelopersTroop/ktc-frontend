"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

type THeaderContext = {
  setIsOpenMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenMobileMenu: boolean;
};
export const HeaderContext = createContext({} as THeaderContext);

const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // turn of mobile menu when route changes
  useEffect(() => {
    setIsOpenMobileMenu(false);
  }, [pathname, searchParams]);

  return (
    <HeaderContext.Provider value={{ setIsOpenMobileMenu, isOpenMobileMenu }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
