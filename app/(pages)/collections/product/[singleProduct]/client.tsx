"use client";
import { useGetProductDetailsQuery } from "@/app/globalRedux/api/product";
import Container from "@/app/ui/container/container";
import Accessory from "./_accessory/accessory";
import Tire from "./_tire/tire";
import Wheels from "./_wheels/wheels";
import "./single-product.css";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/tracker";
import { getPrice } from "@/app/utils/price";

const SingleProductClient: React.FC<{ singleProduct: string }> = ({
  singleProduct,
}) => {
  const { data } = useGetProductDetailsQuery({
    slug: singleProduct as string,
    params: {},
  });
  const categoryId = data?.product?.categoryId;
  const analyticsSend = useRef(false);

  useEffect(() => {
    // 2. Check the .current property
    if (analyticsSend.current) return;

    // 3. Ensure product data is loaded before tracking
    if (data?.product) {
      trackEvent("product_view", {
        productId: data.product._id,
        productName: data.product.title, // Good practice to include name for marketing logs
      });

      // 4. Update the .current property to true
      analyticsSend.current = true;
    }
  }, [data?.product]); // Dependency ensures this runs when data arrives

  if (!data?.product) {
    return null;
  }

  let productBasedOnCategory = <></>;
  if (categoryId === "67c58e553c7586cd076bf226") {
    productBasedOnCategory = <Wheels product={data.product} />;
  } else if (categoryId === "67c58e423c7586cd076bf223") {
    productBasedOnCategory = <Tire product={data.product} />;
  } else if (categoryId === "67c58e6d3c7586cd076bf22c") {
    productBasedOnCategory = <Accessory product={data.product} />;
  } else {
    productBasedOnCategory = <Wheels product={data.product} />;
  }
  return <Container>{productBasedOnCategory}</Container>;
};

export default SingleProductClient;
