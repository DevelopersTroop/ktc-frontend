"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { Autoplay, Navigation, Zoom } from "swiper/modules"; // Correct ES modules import
import { Swiper, SwiperSlide } from "swiper/react";

const galleryData = [
  {
    type: "Wheels",
    items: [
      { image: "/images/wheels/wheels1.png", title: "American Force" },
      { image: "/images/wheels/wheels2.png", title: "American Force" },
      { image: "/images/wheels/wheels3.png", title: "American Force" },
      { image: "/images/wheels/wheels4.png", title: "American Force" },
      { image: "/images/wheels/wheels5.png", title: "American Force" },
    ],
  },
];

const WheelsGallery = () => {
  return (
    <div>
      {galleryData.map((gallery, galleryIndex) => (
        <div key={gallery.type} className="max-w-[1350px] p-4 mx-auto">
          {/* Section Title */}
          <div className="py-4 lg:py-8">
            <hr className="border-emerald-500 border-[1.5px] w-[100px]" />
            <h3 className="text-3xl lg:text-5xl font-bold uppercase">
              Popular Wheels Available & in-stock
            </h3>
          </div>

          {/* Swiper Gallery */}
          <Swiper
            modules={[Autoplay, Navigation, Zoom]}
            zoom={true}
            navigation={{
              nextEl: `.swiper-button-next-${galleryIndex}`,
              prevEl: `.swiper-button-prev-${galleryIndex}`,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            loop={true}
            spaceBetween={20}
            className="relative !w-full"
          >
            <button
              className={`swiper-button-next-${galleryIndex} w-fit text-black rounded-md absolute left-0 top-1/2 cursor-pointer z-30`}
            >
              <ChevronLeft size={38} />
            </button>
            {gallery.items.map((item, index) => (
              <SwiperSlide key={index}>
                <Link href="/collections/product-category/wheels">
                  <div className="p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-cover"
                    />
                    <h4 className="text-lg font-semibold mt-2 text-center">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              </SwiperSlide>
            ))}

            <button
              className={`swiper-button-prev-${galleryIndex} w-fit text-black rounded-md absolute right-0 top-1/2 flex items-center cursor-pointer z-30`}
            >
              <ChevronRight size={38} />
            </button>
          </Swiper>

          <div className="text-center mt-4">
            <button className="px-4 py-2 text-emerald-400 bg-gray-700 bg-opacity-50 text-2xl font-semibold uppercase outline outline-1 outline-emerald-500">
              <Link href="/collections/product-category/wheels">
                View popular wheels
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WheelsGallery;
