import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import { metaDataHelper } from "@/app/utils/metadata";
import React from "react";

export async function generateMetadata() {
  try {
    return {
      ...metaDataHelper({
        title: `Store Location - Wheel Tire USA`,
        description: "",
      }),
      alternates: {
        canonical: `https://wheeltireusa.com/store-location`,
      },
    };
  } catch (error) {
    // Return default metadata in case of error
    return {
      title: "Error",
    };
  }
}

const StoreLocation: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="p-2">
        <Breadcrumb>
          <Item href={"/"}>Home</Item>
          <Item href={"/"}>Store Location</Item>
        </Breadcrumb>
      </div>
      <div className="flex flex-col mx-auto justify-center items-center gap-8 my-10">
        {/* content */}
        <div className="flex flex-col gap-8 w-full h-full px-4">
          <div>
            <h1 className="text-4xl text-gray-800 font-medium text-center">
              Store Location
            </h1>
          </div>
          <div>
            <p className="text-center text-lg text-gray-500 mb-5">
              KTC Audio Custom Wheels And Tires has been proudly serving the
              community for over 30 years, we specialize in premium car audio
              systems, custom wheels, and high-quality tires to enhance your
              vehicle’s performance and style. Our decades of experience and
              commitment to customer satisfaction make us the trusted choice for
              all your automotive needs. Stop by today and let our expert team
              help you find the perfect solutions for your car, backed by a
              legacy of excellence and reliability.
            </p>
            <p className="text-center text-gray-500">
              Visit us at 2193 South Chambers Road, Aurora, CO 80014
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocation;
