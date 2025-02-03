"use client";
import HeaderProvider from "./context/header-provider";
import MainMenu from "./main-menu";

export default function Header() {
  return (
    <div className="hidden min-[1160px]:block sticky top-0 w-full z-50 bg-gray-600">
      <HeaderProvider>
        <header className="w-full max-w-[1350px] relative mx-auto">
          <div className="relative px-3 flex h-[70px] header-lg:px-8">
            <div className="flex items-start w-full gap-4 h-full">
              <div className="w-full h-full">
                <MainMenu />
              </div>
            </div>
          </div>
        </header>
      </HeaderProvider>
    </div>
  );
}
