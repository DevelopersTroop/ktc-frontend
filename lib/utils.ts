import { s3BucketUrl } from "@/app/utils/api";
import { TInventoryItem } from "@/types/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeImageUrl(
  url: string | undefined,
  notAvailableImage?: string
): string {
  if (!url || url === "") {
    return notAvailableImage ?? "/not-available.webp";
  }
  if (
    url.startsWith("http:") ||
    url.startsWith("data:") ||
    url.startsWith("/") ||
    url.startsWith("https:")
  ) {
    return url;
  } else {
    return `${s3BucketUrl}/${url}`;
  }
}

export function removeHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

export function getProductImage(imageErr: boolean, product: TInventoryItem) {
  const notAvailableImage =
    product.category.slug === "wheels"
      ? "/not-available.webp"
      : product.category.slug === "tires"
      ? "/accessory-not-available.webp"
      : "";
  if (imageErr) {
    return normalizeImageUrl("", notAvailableImage);
  }

  return normalizeImageUrl(
    product.thumbnail || product.image_url || product.image_url1,
    notAvailableImage
  );
}
