"use client";

import Loading from "@/app/(pages)/collections/product/[singleProduct]/loading";
import { useGetPromoQuery } from "@/app/globalRedux/api/promo";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pathMap = {
  "/": "home",
};

export default function DiscountBanner() {
  const pathName = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const { data, isLoading } = useGetPromoQuery(
    (pathMap[pathName as keyof typeof pathMap] as string) ?? "all"
  );

  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="overflow-hidden cursor-pointer bg-primary transition-all duration-300 hover:bg-primary-hover py-2 h-12 text-xl font-semibold flex items-center text-white">
        <Loading />
      </div>
    );
  }

  if (!data?.promoBar) {
    return null;
  }

  return (
    <div
      onClick={() => {
        router.push(data.promoBar.url);
      }}
      className="overflow-hidden cursor-pointer bg-primary transition-all duration-300 hover:bg-primary-hover py-2 text-xl h-12 font-semibold text-white"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="whitespace-nowrap "
      >
        {data.promoBar.title}
      </motion.div>
    </div>
  );
}
