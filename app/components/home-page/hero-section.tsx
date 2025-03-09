import HomeYmm from "./home-ymm";

export default function HeroSection() {
  const banner = {
    backgroundImage: `url('/images/hero.jpeg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "750px",
  };

  return (
    <div className="relative h-screen bg-cover bg-center py-20" style={banner}>
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="w-full flex flex-col items-center gap-10">
          <div>
            <h1 className=" text-2xl md:text-6xl text-white uppercase font-bold">
              Find the best wheels & tires
            </h1>
          </div>

          <div className="w-full flex flex-col items-center bg-gray-900/80 md:px-8 pb-8 rounded-lg text-white">
            <div className="w-full flex flex-row">
              <div className="w-full p-4 bg-primary hover:bg-primary-hover">
                <h2 className="uppercase text-xl">SEARCH VEHICLE</h2>
              </div>
              <div className="w-full p-4 bg-black">
                <h2 className="uppercase text-xl">WHEELS BY SIZE & BRAND</h2>
              </div>
            </div>

            <HomeYmm />

          </div>
        </div>
      </div>
    </div>
  );
}
