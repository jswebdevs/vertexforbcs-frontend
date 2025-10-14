import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow components
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-white text-3xl"
    onClick={onClick}
  >
    ❯
  </div>
);
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-white text-3xl"
    onClick={onClick}
  >
    ❮
  </div>
);

const LatestArrival = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axios.get(
          "https://rajproperty-backend-1.onrender.com/api/recent"
        );
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching recent properties:", err);
      }
    };
    fetchRecent();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, properties.length),
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(2, properties.length) },
      },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="px-[5%] py-10 bg-gray-900 text-white w-full overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">Latest Arrivals</h2>
        <p className="text-gray-400 mt-2">
          Check out the newest properties added recently
        </p>
      </div>

      {/* Inner padding to protect outer rings */}
      <div className="relative px-6">
        {properties.length === 0 ? (
          <p className="text-center text-gray-400">No recent properties yet.</p>
        ) : (
          <Slider {...settings} className="!overflow-visible">
            {properties.map((item) => {
              const isLand = item?.landDetails;
              const isFlat = item?.flatDetails;
              const isHouse = item?.houseDetails;

              const bgImage = item?.media?.featuredImage?.url
                ? `https://rajproperty-backend-1.onrender.com/uploads${item.media.featuredImage.url}`
                : "https://via.placeholder.com/400x300?text=No+Image";

              return (
                <div
                  key={item._id}
                  className="px-3 sm:px-4 relative z-10 flex justify-center"
                >
                  {/* Outer wrapper for ring and shadow */}
                  <div
                    className="relative group h-72 w-[90%] transition-all duration-300
                    hover:ring-2 hover:ring-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]
                    ring-1 ring-transparent rounded-2xl flex items-stretch z-10 m-1"
                  >
                    {/* Inner clipped content (so glow can go outside) */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-800">
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${bgImage})`,
                          backgroundSize: "cover",
                          backgroundPosition: "top center",
                        }}
                      ></div>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-2xl">
                        <Link
                          to={`/${
                            item?.meta?.tags?.includes("Land")
                              ? "lands"
                              : item?.meta?.tags?.includes("Flat")
                              ? "flats"
                              : "houses"
                          }/${item._id}`}
                          className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-white text-lg font-semibold hover:bg-white/30 transition hover:ring-1 hover:ring-blue-200"
                        >
                          View Details
                        </Link>
                      </div>

                      {/* Info Section */}
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
                        <p className="text-sm mt-1 text-center">
                          {item.location?.mouja || "N/A"}{" "}
                          {isLand && item.landDetails?.landSizeKatha
                            ? `- ${item.landDetails.landSizeKatha} Katha`
                            : ""}
                          {isLand && item.pricing?.value
                            ? ` - ${item.pricing.value.toLocaleString()} BDT`
                            : ""}
                        </p>

                        {isFlat && (
                          <p className="text-sm mt-1 text-center">
                            Beds: {item.flatDetails?.bed || "N/A"}, Baths:{" "}
                            {item.flatDetails?.bath || "N/A"}, Balcony:{" "}
                            {item.flatDetails?.balcony || "N/A"}
                          </p>
                        )}

                        {isHouse && (
                          <p className="text-sm mt-1 text-center">
                            Total Land:{" "}
                            {item.landDetails?.landSizeKatha || "N/A"} Katha,
                            Floors: {item.landDetails?.totalFloors || "N/A"},
                            Units: {item.houseDetails?.unitsPerFlat || "N/A"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default LatestArrival;
