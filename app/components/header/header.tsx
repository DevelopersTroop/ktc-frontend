"use client";
import HeaderProvider from "./context/header-provider";
import Navbar from "./mega-menu";

export default function Header() {
  return (
    <div className="hidden min-[1160px]:block sticky top-0 w-full z-50 bg-gray-600">
      <HeaderProvider>
        <header className="w-full  relative mx-auto">
          <div className="relative flex h-[70px] px-20">
            <Navbar isHomePage />
          </div>
        </header>
      </HeaderProvider>
    </div>
  );
}
