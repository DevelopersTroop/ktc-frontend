import Container from "@/app/ui/container/container";
import { customFetch } from "@/lib/common-fetch";
import { TInventoryItem } from "@/types/product";
import { IApiRes } from "@/types/redux-helper";
import Accessory from "./_accessory/accessory";
import Suspension from "./_suspension/suspension";
import Tire from "./_tire/tire";
import Wheels from "./_wheels/wheels";
import "./single-product.css";

const SingleProduct = async ({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}) => {
  const { singleProduct } = await params;
  const response = await customFetch<IApiRes<{ product: TInventoryItem }>>(
    `products/${singleProduct}`,
  );

  // console.log("response    =========   ", response.data.product);

  const categoryId = response.data.product?.categoryId;

  // console.log("categoryId === ", categoryId);

  let productBasedOnCategory = <></>;
  if (categoryId === "67c58e553c7586cd076bf226") {
    productBasedOnCategory = <Wheels product={response.data.product} />;
  } else if (categoryId === "67c58e423c7586cd076bf223") {
    productBasedOnCategory = <Tire product={response.data.product} />;
  }else if (categoryId === "67c58e6d3c7586cd076bf22c") {
    productBasedOnCategory = <Accessory product={response.data.product} />;
  } else {
    productBasedOnCategory = <Wheels product={response.data.product} />;
  }
  return <Container>{productBasedOnCategory}</Container>;
};

export default SingleProduct;
