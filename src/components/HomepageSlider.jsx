import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 transform -translate-y-1/2 top-1/2 z-10 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900"
    style={{ left: "-50px" }} // Positioning outside the image
  >
    <FaArrowLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 transform -translate-y-1/2 top-1/2 z-10 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-900"
    style={{ right: "-50px" }} // Positioning outside the image
  >
    <FaArrowRight />
  </button>
);

const HomePageSlider = () => {
  const [sliderImages, setSliderImages] = useState([]);

  // Fetching images from homepageslider.json
  useEffect(() => {
    fetch("slider.json")
      .then((response) => response.json())
      .then((data) => setSliderImages(data))
      .catch((error) => console.error("Error fetching slider images:", error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px", // Position dots inside the image
          width: "100%",
        }}
      >
        <ul className="flex justify-center">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 bg-white rounded-full hover:bg-gray-500"></div>
    ),
  };

  return (
    <div className="w-[80%] mx-auto mt-10 mb-5">
      <Slider {...settings}>
        {sliderImages.map((img) => (
          <div key={img.id} className="relative">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full object-cover max-h-[600px] h-auto"
              style={{ height: "auto" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomePageSlider;
