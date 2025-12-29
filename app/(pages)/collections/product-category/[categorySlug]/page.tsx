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

  let categoryDetails = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/details-by-slug/${categorySlug}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    if (data?.statusCode === 200) {
      categoryDetails = data.data.category;
    }
  } catch (error) {
    console.error("Error fetching category details:", error);
  }

  const topDescription = categoryDetails?.topDescription || "";
  const bottomDescription = categoryDetails?.bottomDescription || "";

  let collection = <></>;
  if (categorySlug === "wheels") {
    collection = (
      <WheelsCategory
        page={Number(page)}
        topDescription={topDescription}
        bottomDescription={bottomDescription}
      />
    );
  } else if (categorySlug === "tires") {
    collection = (
      <TireCategory
        page={Number(page)}
        topDescription={topDescription}
        bottomDescription={bottomDescription}
      />
    );
  } else if (categorySlug === "suspension") {
    collection = (
      <SuspensionCategory
        topDescription={topDescription}
        bottomDescription={bottomDescription}
      />
    );
  } else if (categorySlug === "accessories") {
    collection = (
      <AccessoriesCategory
        page={Number(page)}
        topDescription={topDescription}
        bottomDescription={bottomDescription}
      />
    );
  }

  return collection;
};

export default Collection;
