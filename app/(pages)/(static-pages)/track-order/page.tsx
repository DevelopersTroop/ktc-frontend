import Link from "next/link";
import React from "react";

const TrackOrderPage: React.FC = () => {
  return (
    <div className="w-full mx-auto text-center my-12">
      <h1 className="text-2xl text-gray-800 font-medium">Track Your Order</h1>
      {/* Add your tracking form or components here */}
      {/* here i need to one email input field and on submit button to track the order button place input right side of the button */}
      <div className="w-full flex flex-wrap justify-center items-center gap-2 mt-3">
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 "
        />
        <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2">Track Order</button>
      </div>

      <div className="w-full flex flex-col gap-3 mt-7 text-gray-600">
        <p>
          Be sure to inspect package BEFORE signing any documents. If damaged,
          be sure to make FULL NOTES on documents BEFORE SIGNING.
        </p>
        <div>
          <p className="font-semibold">
            Need assistance or have questions?{" "}
            <Link href="#" className="text-primary font-normal">
              Click here
            </Link>{" "}
          </p>
        </div>
        <div>
          <p className="font-semibold">
            Important -{" "}
            <Link href="#" className="text-primary font-normal">
              Test Fitting Instructions
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
