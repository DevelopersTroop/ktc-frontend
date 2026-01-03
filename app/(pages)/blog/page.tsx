import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import Container from "@/app/ui/container/container";
import { BlogList } from "./blog-list";

import { metaDataHelper } from "@/app/utils/metadata";

export async function generateMetadata() {
  try {
    return {
      ...metaDataHelper({
        title: `Blog - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/blog`,
      },
    };
  } catch (error) {
    // Return default metadata in case of error
    return {
      title: "Error",
    };
  }
}

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
