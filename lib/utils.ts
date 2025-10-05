import { s3BucketUrl } from "@/app/utils/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeImageUrl(url: string | undefined): string {
  console.log("url", typeof url);
  if (!url || url === "") {
    return "/not-available.webp";
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
