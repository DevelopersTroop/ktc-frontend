import { metaDataHelper } from "@/app/utils/metadata";
import Page from "./client";

export async function generateMetadata() {
  try {
    return {
      ...metaDataHelper({
        title: `Add login - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/add-login`,
      },
    };
  } catch (error) {
    // Return default metadata in case of error
    return {
      title: "Error",
    };
  }
}

export default function Register() {
  return <Page />;
}
