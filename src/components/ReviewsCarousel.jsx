import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json") // Fetching review data from the JSON file
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 cards at once on PC
    slidesToScroll: 2, // Scroll 2 cards at a time on PC
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 card on mobile
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // 3 cards on larger screens
          slidesToScroll: 2, // Scroll 2 at a time
        },
      },
    ],
  };

  return (
    <div className="w-[80%] mx-auto mt-10 mb-10">
      <h2 className="text-2xl font-bold text-center mb-2">রিভিউসমূহ</h2>
      <p className="text-center mb-10">জেনে নিন আমাদের ছাত্ররা কি বলে। </p>

      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className="px-6">
            {" "}
            {/* Add horizontal padding */}
            <div
              className="bg-white p-2 md:p-6 shadow-md rounded-lg overflow-hidden  items-center justify-center "
              style={{ height: "400px" }} // Fixed height for consistency
            >
              {/* Review Text */}
              <p className="text-sm md:text-lg text-gray-700 mb-6 text-center">
                "{review.text}"
              </p>

              {/* Reviewer Image and Info */}
              <div className="flex items-center mt-auto absolute bottom-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 mr-3"
                />
                <div>
                  <p className="font-bold text-black">{review.name}</p>
                  {/* Split the designation at new line characters and map each part */}
                  {review.designation.split("\n").map((line, index) => (
                    <p key={index} className="text-sm text-black">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewsCarousel;
