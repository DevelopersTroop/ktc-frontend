"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DiscountBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden bg-emerald-500 py-2 text-xl font-semibold text-white">
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
