import { useGetBlogsQuery } from "@/app/globalRedux/api/blog";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import Container from "@/app/ui/container/container";
import BlogBanner from "./blog-banner";
import { BlogList } from "./blog-list";
import { metaDataHelper } from "@/app/utils/metadata";

export const metadata = metaDataHelper({
  title: "Dive Into Custom Wheel Stories on the Amani Forged Blog",
  keywords: "",
  description:
    "Stay ahead in wheel customization with the Amani Forged Blog. Learn premium wheel trends, build inspiration, expert tips, and real-world performance stories.",
  openGraph: {
    title: "Dive Into Custom Wheel Stories on the Amani Forged Blog",
    description:
      "Stay ahead in wheel customization with the Amani Forged Blog. Learn premium wheel trends, build inspiration, expert tips, and real-world performance stories.",
  },
  alternates: {
    canonical: "https://amaniforged.com/blog",
  },
});

export default function BlogPage() {
  return (
    <>
      <Container>
        <div className="flex w-full items-start">
          <div className="lg:w-[30%]">
            <Breadcrumb>
              <Item href={"/"}>Home</Item>
              <Item isEnd href={`/blog`}>
                Blog
              </Item>
            </Breadcrumb>
          </div>
        </div>
      </Container>
      {/* <BlogBanner /> */}
      <BlogList />
    </>
  );
}
