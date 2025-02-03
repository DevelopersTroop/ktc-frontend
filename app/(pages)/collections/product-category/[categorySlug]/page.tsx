import AccessoriesCategory from "./_accessories/accessories-category";
import SuspensionCategory from "./_suspension/suspension-category";
import TireCategory from "./_tire/tire-category";
import WheelsCategory from "./_wheels/wheels-category";

const Collection = async ({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) => {
  const { categorySlug } = await params;

  console.log("categorySlug  == ", categorySlug);

  let collection = <></>;
  if (categorySlug === "wheels") {
    collection = <WheelsCategory />;
  } else if (categorySlug === "tires") {
    collection = <TireCategory />;
  } else if (categorySlug === "suspension") {
    collection = <SuspensionCategory />;
  } else if (categorySlug === "accessories") {
    collection = <AccessoriesCategory />;
  }

  return collection;
};

export default Collection;
