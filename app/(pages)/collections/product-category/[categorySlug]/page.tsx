import AccessoriesCategory from "./_accessories/accessories-category";
import SuspensionCategory from "./_suspension/suspension-category";
import TireCategory from "./_tire/tire-category";
import WheelsCategory from "./_wheels/wheels-category";

const Collection = async ({
  params,
}: {
  params: Promise<{ categorySlug: string; page: string }>;
}) => {
  const { categorySlug, page } = await params;

  let collection = <></>;
  if (categorySlug === "wheels") {
    collection = <WheelsCategory page={Number(page)} />;
  } else if (categorySlug === "tires") {
    collection = <TireCategory page={Number(page)} />;
  } else if (categorySlug === "suspension") {
    collection = <SuspensionCategory />;
  } else if (categorySlug === "accessories") {
    collection = <AccessoriesCategory page={Number(page)} />;
  }

  return collection;
};

export default Collection;
