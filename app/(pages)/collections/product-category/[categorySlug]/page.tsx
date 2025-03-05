import AccessoriesCategory from "./_accessories/accessories-category";
import SuspensionCategory from "./_suspension/suspension-category";
import TireCategory from "./_tire/tire-category";
import WheelsCategory from "./_wheels/wheels-category";

const Collection = async ({
  params,
  page,
}: {
  params: Promise<{ categorySlug: string }>;
  page: number;
}) => {
  const { categorySlug } = await params;

  let collection = <></>;
  if (categorySlug === "wheels") {
    collection = <WheelsCategory page={page} />;
  } else if (categorySlug === "tires") {
    collection = <TireCategory page={page} />;
  } else if (categorySlug === "suspension") {
    collection = <SuspensionCategory />;
  } else if (categorySlug === "accessories") {
    collection = <AccessoriesCategory />;
  }

  return collection;
};

export default Collection;
