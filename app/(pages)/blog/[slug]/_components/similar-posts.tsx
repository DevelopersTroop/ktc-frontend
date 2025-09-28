import { useGetBlogsQuery } from "@/app/globalRedux/api/blog";
import { truncWord } from "@/app/utils/string";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SimilaPostsPagination } from "./similar-posts-pagination";
import { normalizeImageUrl } from "@/lib/utils";

export const SimilarPosts: React.FC<{ slug: string }> = ({ slug }) => {
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetBlogsQuery({
    size: 3,
    page,
    sort: [{ whom: "updatedAt", order: "asc" }],
  });

  // Render loading skeleton
  if (isLoading || !data?.posts || data?.posts?.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold my-6 border-b">Similar Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="shadow-md flex flex-col gap-y-4 rounded-md animate-pulse"
            >
              <div className="h-[200px] bg-gray-200 w-full rounded-t-md"></div>
              <div className="px-4 py-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold my-6 border-b">Similar Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.posts
          ?.filter((blog) => blog.slug !== slug)
          ?.map((blog, i) => {
            return (
              <Link
                href={`/blog/${blog.slug}`}
                key={i}
                className="shadow-md flex flex-col gap-y-4 rounded-md"
              >
                <div className="h-[200px] relative w-full">
                  <Image
                    fill
                    className="object-cover"
                    src={normalizeImageUrl(blog.thumbnail)}
                    alt={blog.title}
                  />
                </div>
                <div className="px-4 py-4">
                  <h1 className="text-xl font-bold text-primary">
                    {truncWord(blog.title, 3)}
                  </h1>
                </div>
              </Link>
            );
          })}
      </div>
      {data?.pages && data.pages > 1 ? (
        <SimilaPostsPagination
          pages={data?.pages}
          page={page}
          setPage={setPage}
        />
      ) : null}
    </div>
  );
};
