"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DiscountBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      onClick={() => {
        router.push("/financing");
      }}
      className="overflow-hidden cursor-pointer bg-primary transition-all duration-300 hover:bg-primary-hover py-2 text-xl font-semibold text-white"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="whitespace-nowrap "
      >
        ENJOY 0% FINANCING
      </motion.div>
    </div>
  );
}
