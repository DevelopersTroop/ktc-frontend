"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DiscountBanner() {
  const [isVisible, setIsVisible] = useState(true);
  console.log("isVisible = ", isVisible);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-emerald-500 text-white text-xl font-semibold py-2 overflow-hidden">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="whitespace-nowrap"
      >
        ENJOY 0% FINANCING
      </motion.div>
    </div>
  );
}
