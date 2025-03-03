import { Button } from "@/components/ui/button";
import Link from "next/link";

const WheelsSection = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/images/gallery/image9.jpeg')`,
      }}
    >
      <div className="h-full bg-white/40">
        <div className="container mx-auto sm:px-2 py-4 h-full flex items-center sm:items-start justify-end ">
          <div className="max-w-2xl bg-gray-900/80 p-4 md:p-8 rounded-3xl text-white">
            <div className="flex gap-4">
              <img
                src="/images/logo.jpeg"
                alt="ktc audio"
                className="h-16 mb-6 inline-block"
              />
              <p className="text-3xl">KTC Audio Custom Wheels</p>
            </div>
            <p className="text-lg leading-relaxed mb-8">
              KTC Audio Custom Wheels And Tires has been proudly serving the
              community for over 30 years, we specialize in premium car audio
              systems, custom wheels, and high-quality tires to enhance your
              vehicle’s performance and style. Our decades of experience and
              commitment to customer satisfaction make us the trusted choice for
              all your automotive needs.
            </p>

            <Link href="/collections/product-category/wheels">
              <Button className="bg-primary hover:bg-primary-hover text-black font-bold py-3 px-8 text-lg uppercase tracking-wider">
                Shop Wheels
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelsSection;
