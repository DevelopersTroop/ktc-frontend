"use client"
import { useGetProductDetailsQuery } from "@/app/globalRedux/api/product";
import Container from "@/app/ui/container/container";
import Accessory from "./_accessory/accessory";
import Tire from "./_tire/tire";
import Wheels from "./_wheels/wheels";
import "./single-product.css";

const SingleProductClient: React.FC<{ singleProduct: string }> = ({ singleProduct }) => {
  const { data } = useGetProductDetailsQuery({ slug: singleProduct as string, params: {} });

  const categoryId = data?.product?.categoryId;
  if (!data?.product) {
    return null
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
