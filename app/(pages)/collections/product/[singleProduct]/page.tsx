import { TInventoryItem } from "@/types/product";
import Container from "@/app/ui/container/container";
import Accessory from "./_accessory/accessory";
import Suspension from "./_suspension/suspension";
import Tire from "./_tire/tire";
import Wheels from "./_wheels/wheels";
import "./single-product.css";
import { customFetch } from "@/lib/common-fetch";
import { IApiRes } from "@/types/redux-helper";


const SingleProduct = async ({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}) => {
  const { singleProduct } = await params;
  const response = await customFetch<IApiRes<TInventoryItem, "product">>(`products/${singleProduct}`);


  let productBasedOnCategory = <></>;
  if (singleProduct === "wheels") {
    productBasedOnCategory = <Wheels product={response.data.product} />;
  } else if (singleProduct === "tire") {
    productBasedOnCategory = <Tire product={response.data.product} />;
  } else if (singleProduct === "suspension") {
    productBasedOnCategory = <Suspension product={response.data.product} />;
  } else if (singleProduct === "accessories") {
    productBasedOnCategory = <Accessory product={response.data.product} />;
  } else {
    productBasedOnCategory = <Wheels product={response.data.product} />;
  }
  return <Container>{productBasedOnCategory}</Container>;
};

export default SingleProduct;
