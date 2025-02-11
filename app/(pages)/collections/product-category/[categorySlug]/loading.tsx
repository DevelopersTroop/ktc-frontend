import Container from "@/app/ui/container/container";
import FilterLoadingSkeleton from "./_loading/filter-loading-skeleton";
import ProductCardSkeleton from "./_loading/product-card-skeleton";

// type ProductsPageProps = {
//   searchParams: Promise<{ [key: string]: string | undefined }>;
//   params: Promise<{ categorySlug: string }>;
//   page?: number;
// };
const ProductCategory = async () => {
  return (
    <Container>
      <div className="flex w-full gap-6 pt-6">
        <div className={"hidden lg:block lg:w-1/4"}>
          <FilterLoadingSkeleton />
        </div>
        <div
          className={
            "w-full lg:w-3/4 grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-min"
          }
        >
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <ProductCardSkeleton key={`product-card-loading-${index}`} />
            ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductCategory;
