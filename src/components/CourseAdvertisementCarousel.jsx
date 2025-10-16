import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const CourseAdvertisementCarousel = () => {
  const [homeData, setHomeData] = useState(null); // To store heading and subheading
  const [courses, setCourses] = useState([]); // To store courses data

  // Fetch heading and subheading from homecourses.json
  useEffect(() => {
    fetch("https://vertexforbcs.com/vartexforbcs/web/home-courses")
      .then((response) => response.json())
      .then((data) => setHomeData(data[0])) // Assuming the first item contains heading/subheading
      .catch((error) => console.error("Error fetching home data:", error));
  }, []);

  // Fetch courses from the API
  useEffect(() => {
    fetch("https://vertexforbcs.com/vartexforbcs/web/courses/data")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 courses at a time
    slidesToScroll: 2, // Scroll 2 courses at a time
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 course for smaller screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 courses for larger screens
        },
      },
    ],
  };

  return (
    <div className="w-[80%] mx-auto mt-10 mb-10">
      {/* Heading and Subheading */}
      {homeData && (
        <>
          <h2 className="text-2xl font-bold text-center mb-2">
            {homeData.heading}
          </h2>
          <p className="text-center mb-10">{homeData.subheading}</p>
        </>
      )}

      {/* Carousel for courses */}
      <Slider {...settings}>
        {courses.map((course) => (
          <div key={course.id} className="px-6">
            <Link
              to={`/courses/${course.title}`} // Assuming this links to a course detail page
              className="block bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={course.courseImage} // Use courseImage from the API
                alt={course.title} // Use course title for alt text
                className="w-full h-auto object-cover"
              />
              <div className="bg-green-500 text-white text-center py-2">
                {course.title} {/* Displaying course title */}
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CourseAdvertisementCarousel;
