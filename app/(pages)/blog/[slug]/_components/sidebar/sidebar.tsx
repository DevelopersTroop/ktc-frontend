import { normalizeImageUrl } from "@/lib/utils";
import { TInventoryItem } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { BlogPageSidebarSkeleton } from "./sidebar-skeleton";

export const BlogPageSidebar: React.FC<{
  relatedProducts?: TInventoryItem[];
  isLoading: boolean;
}> = ({ relatedProducts, isLoading }) => {
  // const { data, isLoading } = useGetBlogsQuery(
  //   { size: 5, page: 1, sort: [{ whom: "updatedAt", order: "desc" }] },
  //   {
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-y-6">
      <div className="bg-primary text-white py-4 px-2 rounded-[4px] my-6">
        <h2 className="text-2xl font-semibold">Related Products</h2>
      </div>
      {isLoading || !relatedProducts ? (
        <BlogPageSidebarSkeleton />
      ) : (
        relatedProducts?.map((product, i) => {
          return (
            <Link key={i} href={`/collections/product/${product.slug}`}>
              <div className="shadow-md flex flex-col gap-y-4 rounded-md">
                <div className="h-[200px] relative w-full">
                  <Image
                    objectFit="contain"
                    fill
                    src={normalizeImageUrl(product.item_image)}
                    alt={product?.title || ""}
                  />
                </div>
                <div className="px-4 py-4">
                  <h1 className="text-xl font-bold text-primary">
                    {product.title}
                  </h1>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};
