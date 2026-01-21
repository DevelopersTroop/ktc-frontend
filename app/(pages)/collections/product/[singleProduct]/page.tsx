import { apiBaseUrl } from "@/app/utils/api";
import { metaDataHelper } from "@/app/utils/metadata";
import { normalizeImageUrl, removeHtmlTags } from "@/lib/utils";
import { TInventoryItem } from "@/types/product";
import { Metadata } from "next";
import SingleProductClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}): Promise<Metadata> {
  try {
    const { singleProduct } = await params; // Extract product ID from params.
    const response = await fetch(`${apiBaseUrl}/products/${singleProduct}`, {
      cache: "force-cache",
      next: { revalidate: 300 },
    });

    const result = await response.json(); // Parse response.

    const product = result.data?.product as TInventoryItem; // Extract product data.

    return metaDataHelper({
      title: `${product.title}`, // Set page title based on product name.
      description: removeHtmlTags(`${product.title}`), // Set meta description from product data.
      openGraph: {
        title: `${product.title}`,
        description: removeHtmlTags(`${product.title}`),
        url: `https://wheeltireusa.com/collections/product/${singleProduct}`,
        images: [
          {
            url: normalizeImageUrl(
              product.item_image || product.image_url || product.image_url1
            ),
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ],
      },
      alternates: {
        canonical: `https://wheeltireusa.com/collections/product/${singleProduct}`,
      },
    });
  } catch (error) {
    return {
      title: "Custom wheel - Wheel Tire USA", // Fallback title in case of an error.
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ singleProduct: string }>;
}) {
  const { singleProduct } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${singleProduct}`
  );

  const data = (await response.json()) as { data: { product: TInventoryItem } };
  return <SingleProductClient product={data.data.product} />;
}
