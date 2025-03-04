import Collection from "../page";

const ProductNavigation = async ({
  params,
}: {
  params: Promise<{ page: string; categorySlug: string }>;
}) => {
  const { page } = await params;
  return <Collection page={Number(page)} params={params} />;
};

export default ProductNavigation;
