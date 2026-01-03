"use client";
import { useGetProductDetailsQuery } from "@/app/globalRedux/api/product";
import Container from "@/app/ui/container/container";
import { trackEvent } from "@/lib/tracker";
import { useEffect, useRef } from "react";
import Accessory from "./_accessory/accessory";
import Tire from "./_tire/tire";
import Wheels from "./_wheels/wheels";
import "./single-product.css";
import { TInventoryItem } from "@/types/product";

const SingleProductClient: React.FC<{ product: TInventoryItem }> = ({
  product,
}) => {
  const categoryId = product?.categoryId;
  const analyticsSend = useRef(false);

  useEffect(() => {
    // 2. Check the .current property
    if (analyticsSend.current) return;

    // 3. Ensure product data is loaded before tracking
    if (product) {
      trackEvent("product_view", {
        productId: product._id,
        productName: product.title, // Good practice to include name for marketing logs
      });

      // 4. Update the .current property to true
      analyticsSend.current = true;
    }
  }, [product]); // Dependency ensures this runs when data arrives

  if (!product) {
    return null;
  }

  let productBasedOnCategory = <></>;
  if (categoryId === "67c58e553c7586cd076bf226") {
    productBasedOnCategory = <Wheels product={product} />;
  } else if (categoryId === "67c58e423c7586cd076bf223") {
    productBasedOnCategory = <Tire product={product} />;
  } else if (categoryId === "67c58e6d3c7586cd076bf22c") {
    productBasedOnCategory = <Accessory product={product} />;
  } else {
    productBasedOnCategory = <Wheels product={product} />;
  }
  return <Container>{productBasedOnCategory}</Container>;
};

export default SingleProductClient;
