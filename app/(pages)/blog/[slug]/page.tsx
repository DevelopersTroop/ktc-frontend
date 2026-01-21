import { apiBaseUrl } from "@/app/utils/api";
import { Client } from "./client";
import { Metadata } from "next";
import { TPost } from "@/types/post";
import { metaDataHelper } from "@/app/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await fetch(`${apiBaseUrl}/posts/${slug}`, {
      cache: "force-cache",
      next: { revalidate: 120 },
    });

    const result = await response.json(); // Parse response.

    const post = result.data?.post as TPost; // Extract product data.

    return metaDataHelper({
      title: `${
        post?.metaTitle ? post?.metaTitle : post?.title
      } - Wheel Tire USA`, // Set page title based on product name.
      description: post?.metaDescription ? post?.metaDescription : post?.title, // Set meta description from product data.
      openGraph: {
        title: `${post?.metaTitle} - Wheel Tire USA`,
        description: post?.metaDescription,
        url: `https://wheeltireusa.com/collections/product/${slug}`,
      },
      alternates: {
        canonical: `https://wheeltireusa.com/collections/product/${slug}`,
      },
    });
  } catch (error) {
    return {
      title: "Blog - KTC Audio", // Fallback title in case of an error.
    };
  }
}
export default async function SinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return <Client slug={resolvedParams.slug} />;
}
