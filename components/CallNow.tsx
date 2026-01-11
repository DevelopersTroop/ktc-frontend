"use client";
import { PhoneCall, X } from "lucide-react";
import { useState, useEffect } from "react";

export const CallNow = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration and load state from localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("callButtonExpanded");
    if (saved !== null) {
      setIsExpanded(saved === "true");
    }
  }, []);

  // Save state to localStorage whenever it changes
  const handleToggle = (expanded: boolean) => {
    setIsExpanded(expanded);
    localStorage.setItem("callButtonExpanded", String(expanded));
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-[11%] max-[1366px]:bottom-[12%] right-0 z-20 hidden lg:block">
        <div className="relative">
          {/* Expanded state */}
          <div
            className={`bg-primary flex items-center px-3 py-2 rounded-l-md gap-3 text-white font-semibold transition-all duration-300 ease-in-out ${
              isExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full pointer-events-none"
            }`}
          >
            <a href="tel:+18138125257" className="flex items-center gap-2">
              <PhoneCall size={18} />
              <span className="whitespace-nowrap">
                Call us: +1 (813) 812-5257
              </span>
            </a>
            <button
              onClick={() => handleToggle(false)}
              className="hover:bg-white/20 rounded p-1 transition-colors"
              aria-label="Collapse call button"
            >
              <X size={18} />
            </button>
          </div>

          {/* Collapsed state */}
          <button
            onClick={() => handleToggle(true)}
            className={`bg-primary flex items-center justify-center w-[60px] h-[60px] rounded-full text-white font-semibold hover:bg-primary/90 transition-all duration-300 ease-in-out mr-5 absolute top-0 right-0 ${
              !isExpanded
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0 pointer-events-none"
            }`}
            aria-label="Expand call button"
          >
            <PhoneCall size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      <a
        href="tel:18663447857"
        className="fixed bottom-[10%] right-3 bg-primary z-20 flex lg:hidden items-center px-2 py-1 rounded-full gap-2 text-white font-semibold max-[553px]:h-[60px] max-[553px]:w-[60px] max-[553px]:right-5 justify-center w-[60px] h-[60px]"
      >
        <div className="flex items-center gap-1">
          <PhoneCall strokeWidth={2} size={18} />
          <p className="sr-only">Call us:</p>
        </div>
        <span className="sr-only">1 (866) 344-7857</span>
      </a>
    </>
  );
};
