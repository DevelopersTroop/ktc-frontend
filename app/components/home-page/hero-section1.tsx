export default function HeroSection() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <iframe
        className="absolute inset-0 w-full h-full"
        src="https://www.youtube.com/embed/eOT-iASAxD0?autoplay=1&mute=1&loop=1&playlist=eOT-iASAxD0"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>

      {/* Content Overlay */}
      <div className="relative h-full bg-gray-900/50">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="w-full flex flex-col items-center gap-10">
            <div>
              <h1 className="text-2xl md:text-6xl text-white uppercase font-bold">
                Find the best wheels & tires
              </h1>
            </div>

            <div className="w-full flex flex-col items-center bg-gray-900/80 md:px-8 pb-8 rounded-lg text-white">
              <div className="w-full flex flex-row">
                <div className="w-full p-4 bg-primary">
                  <h2 className="uppercase text-xl">SEARCH VEHICLE</h2>
                </div>
                <div className="w-full p-4 bg-black">
                  <h2 className="uppercase text-xl">WHEELS BY SIZE & BRAND</h2>
                </div>
              </div>

              <div className="w-full p-4">
                <div className="w-full flex flex-col md:flex-row gap-4 mt-4">
                  <select className="w-full p-2 rounded bg-white text-xl text-black">
                    <option value="">Year</option>
                    {/* Add options for years */}
                  </select>
                  <select className="w-full p-2 rounded bg-white text-xl text-black">
                    <option value="">Make</option>
                    {/* Add options for makes */}
                  </select>
                  <select className="w-full p-2 rounded bg-white text-xl text-black">
                    <option value="">Model</option>
                    {/* Add options for models */}
                  </select>
                  <select className="w-full p-2 rounded bg-white text-xl text-black">
                    <option value="">Drive/Trim</option>
                    {/* Add options for trims */}
                  </select>
                </div>
              </div>

              <div className="w-full p-4">
                <button className="w-full bg-primary text-white py-3 text-lg uppercase">
                  Shop wheels
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
