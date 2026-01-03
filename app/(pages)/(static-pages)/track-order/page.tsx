import { metaDataHelper } from "@/app/utils/metadata";
import OrderTracking from "./client";

export async function generateMetadata() {
  try {
    return {
      ...metaDataHelper({
        title: `Track order - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/track-order`,
      },
    };
  } catch (error) {
    // Return default metadata in case of error
    return {
      title: "Error",
    };
  }
}

export default function TrackOrder() {
  return <OrderTracking />;
}
