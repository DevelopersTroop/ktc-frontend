import HeroSection from "./components/home-page/hero-section";
import ViewGallery from "./components/home-page/view-gallery";
import WheelsGallery from "./components/home-page/wheels-gallery";
import WheelsSection from "./components/home-page/wheels-section";

const page = () => {
  return (
    <div>
      <HeroSection />
      <ViewGallery />
      <WheelsSection />
      <WheelsGallery />
      {/* <SuspensionSection /> */}
    </div>
  );
};

export default page;
