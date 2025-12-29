import BannerAndPoster from "./components/home-page/banner-and-poster";
import HomeBlogList from "./components/home-page/blog-list";
import { Categories } from "./components/home-page/categories";
import HeroSection from "./components/home-page/hero-section";
import SuspensionBrands from "./components/home-page/suspension-brands";
import SuspensionSection from "./components/home-page/suspension-section";
import TodaysDeals from "./components/home-page/todays-deals";
import ViewGallery from "./components/home-page/view-gallery";
import WheelCategories from "./components/home-page/wheel-categories";
import WheelsGallery from "./components/home-page/wheels-gallery";
import WheelsSection from "./components/home-page/wheels-section";

const page = () => {
  return (
    <div>
      <HeroSection />
      <Categories />
      <WheelCategories />
      <WheelsGallery />
      <TodaysDeals />
      <HomeBlogList />
      <BannerAndPoster/>  
      <WheelsSection />
      <ViewGallery />
      <SuspensionBrands />
      <SuspensionSection />
    </div>
  );
};


export default page;
