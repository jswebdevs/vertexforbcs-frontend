import HomePageSlider from "../../components/HomepageSlider";
import CourseAdvertisementCarousel from "../../components/CourseAdvertisementCarousel";
import PricingSection from "../../components/PricingSection";
import CourseCards from "../../components/CourseCards";
import ReviewsCarousel from "../../components/ReviewsCarousel";
import Gallery from "../../components/Gallery";

const Homepage = () => {
    return (
      <div>
        <HomePageSlider></HomePageSlider>

        <CourseAdvertisementCarousel></CourseAdvertisementCarousel>

        <PricingSection></PricingSection>

        <CourseCards></CourseCards>

        <Gallery></Gallery>

        <ReviewsCarousel></ReviewsCarousel>

      </div>
    );
};

export default Homepage;