"use client";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { PiChats } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";

const ContactUs: React.FC = () => {
  const banner = {
    backgroundImage: `url('/images/loginhero.jpeg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "400px",
  };

  const smallScreenBanner = {
    ...banner,
    height: "200px",
  };

  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const bannerStyle = isSmallScreen ? smallScreenBanner : banner;

  return (
    <div className="flex flex-col justify-center items-center gap-8 my-10">
      {/* content */}
      <div
        className="w-full h-full flex flex-col justify-center items-center gap-8 px-4"
        style={bannerStyle}
      >
        <div>
          <h1 className="text-5xl  sm:text-7xl text-white font-semibold text-center">
            Contact Us
          </h1>
        </div>
        <div>
          <p className="text-center text-gray-200">
            We'd love to help! Here is how you can reach out to us.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1030px] flex flex-row gap-16 flex-wrap text-center justify-center items-center">
        <Link href="#">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <FiShoppingCart className="text-5xl text-center" />
            </div>
            <div className="text-center font-medium">
              <p>Place a New Order</p>
            </div>
            <div className="text-center">
              <p className="text-sm">
                Monday-Friday 10:00pm -7:00pm <br />
                Saturday 10:00pm-4:00pm
              </p>
            </div>
          </div>
        </Link>

        <Link href="/track-order">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <SlLocationPin className="text-5xl text-center" />
            </div>
            <div className="text-center font-medium">
              <p>Track Your Order</p>
            </div>
          </div>
        </Link>

        <Link href="/contact">
          <div className="w-[220px] h-[200px] flex flex-col gap-2 pt-10 items-center outline outline-1 outline-black rounded-md p-4 hover:shadow-2xl transition-shadow duration-500">
            <div>
              <PiChats className="text-5xl text-center" />
            </div>
            <div className="text-center font-medium">
              <p>Support</p>
            </div>
            <div className="text-center">
              <p className="text-sm">
                Monday-Friday 10:00pm -7:00pm
              </p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default ContactUs;
