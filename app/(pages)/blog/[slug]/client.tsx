"use client";
import { useGetBlogDetailsQuery } from "@/app/globalRedux/api/blog";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import Container from "@/app/ui/container/container";
import { format } from "date-fns";
import { Clock3, UserCircle } from "lucide-react";
import Image from "next/image";
import { ClientLoadingSkeleton } from "./_components/loading";
import { BlogPageSidebar } from "./_components/sidebar/sidebar";
import { SimilarPosts } from "./_components/similar-posts";
import { PrevNext } from "./prevNext";
import BlogBody from "./blog-body";
import { normalizeImageUrl } from "@/lib/utils";

export const Client: React.FC<{ slug: string }> = ({ slug }) => {
  const { data, isLoading } = useGetBlogDetailsQuery(slug);
  // const [showSimilarPosts, similarPostsRef] = useIntersectionObserver()
  return (
    <Container>
      <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-12 w-full">
        {isLoading || !data?.post ? (
          <ClientLoadingSkeleton />
        ) : (
          <div className="col-span-12 lg:col-span-8 lg:shadow-lg py-4 md:py-6 lg:py-8 px-3 md:px-4 flex flex-col gap-y-3 md:gap-y-4 rounded-[6px]">
            <div className="flex w-full items-start overflow-x-auto">
              <Breadcrumb>
                <Item href={"/"}>Home</Item>
                <Item href={`/blog`}>Blog</Item>
                <Item isEnd href={`/blog/${slug}`}>
                  {data?.post?.categoryId?.title}
                </Item>
              </Breadcrumb>
            </div>
            {/* Blog Body */}
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold">
              {data.post.title}
            </h1>
            <div className="flex gap-2 md:gap-4 flex-wrap text-sm md:text-base">
              <div className="flex items-center gap-1 md:gap-2">
                <UserCircle size={16} className="md:w-[18px] md:h-[18px]" />
                <span>Amani Forged</span>
              </div>
              <p>{format(new Date(data.post.updatedAt), "PP")}</p>
              <p className="flex items-center gap-1">
                <Clock3 size={16} className="md:w-[20px] md:h-[20px]" />
                {format(new Date(data.post.updatedAt), "hh:mm aaa")}
              </p>
            </div>
            <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] my-3 md:my-4 lg:my-6 relative">
              <Image
                fill
                src={normalizeImageUrl(data.post.thumbnail)}
                alt={data.post.title}
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
              />
            </div>
            {/* <div
              className="blog__body"
              dangerouslySetInnerHTML={{ __html: data.post.description }}
            /> */}
            <BlogBody post={data?.post} />
            {/* Prev Next */}
            <PrevNext slug={slug} />
            {/* Similar Posts */}
            <SimilarPosts slug={slug} />
          </div>
        )}
        <div className="col-span-12 lg:col-span-4">
          <BlogPageSidebar relatedProducts={data?.post?.relatedProducts} isLoading={isLoading} />
        </div>
      </div>
    </Container>
  );
};
