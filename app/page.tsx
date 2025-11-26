import { Categories } from "./components/home-page/categories";
import HeroSection from "./components/home-page/hero-section";
import SuspensionBrands from "./components/home-page/suspension-brands";
import SuspensionSection from "./components/home-page/suspension-section";
import TodaysDeals from "./components/home-page/todays-deals";
import ViewGallery from "./components/home-page/view-gallery";
import WheelsGallery from "./components/home-page/wheels-gallery";
import WheelsSection from "./components/home-page/wheels-section";

const page = () => {
  return (
    <div>
      <HeroSection />
      <WheelsSection />
      <Categories />
      <TodaysDeals />
      <WheelsGallery />
      <ViewGallery />
      <SuspensionBrands />
      <SuspensionSection />
    </div>
  );
};

export default page;
