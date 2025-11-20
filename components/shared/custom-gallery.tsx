import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface CustomGalleryProps {
  images: { original: string; thumbnail?: string }[];
  height?: string;
  thumbHeight?: string;
}

const CustomGallery: React.FC<CustomGalleryProps> = ({
  images,
  height = "400px",
  thumbHeight = "100px",
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!images || images.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 text-gray-500"
        style={{ height }}
      >
        No Images Found
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Gallery */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="main-swiper"
        style={{ height }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img.original}
              alt={`slide-${idx}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        spaceBetween={10}
        watchSlidesProgress
        className="thumbs-swiper mt-4"
        style={{ height: thumbHeight }}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx} className="cursor-pointer">
            <img
              src={img.thumbnail || img.original}
              alt={`thumb-${idx}`}
              className="w-full h-full object-cover rounded-md border border-gray-300 hover:border-blue-500"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomGallery;
