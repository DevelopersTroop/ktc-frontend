"use client";
import HeaderProvider from "./context/header-provider";
import Navbar from "./main-menu-v2";
// import Navbar from "./mega-menu";

export default function Header() {
  return (
    <div className="hidden min-[1160px]:block sticky top-0 w-full z-50 bg-gray-600">
      <HeaderProvider>
        <header className="w-full  relative container">
          <div className="relative flex min-h-[70px]">
            <Navbar />
          </div>
        </header>
      </HeaderProvider>
    </div>
  );
}
