import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow components
const NextArrow = ({ onClick }) => (
  <div
    className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-white text-3xl hover:text-green-400 transition"
    onClick={onClick}
  >
    ❯
  </div>
);
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute -left-3 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer text-white text-3xl hover:text-green-400 transition"
    onClick={onClick}
  >
    ❮
  </div>
);

const HomeFeaturedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          "https://rajproperty-backend-1.onrender.com/api/featured"
        );
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
      }
    };
    fetchFeatured();
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
    <div className="px-[5%] py-12 bg-gray-900 text-white w-full">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold">Featured Properties</h2>
        <p className="text-gray-400 mt-2 text-lg">
          Check out our featured properties
        </p>
      </div>

      {properties.length === 0 ? (
        <p className="text-center text-gray-400">No featured properties yet.</p>
      ) : (
        <div className="relative">
          <Slider {...settings}>
            {properties.map((item) => {
              const isLand = !!item?.landDetails;
              const isFlat = !!item?.flatDetails;
              const isHouse = !!item?.houseDetails;

              const propertyType = isLand
                ? "Land"
                : isFlat
                ? "Flat"
                : isHouse
                ? "House"
                : "Property";

              const bgImage = item?.media?.featuredImage?.url
                ? `https://rajproperty-backend-1.onrender.com/uploads${item.media.featuredImage.url}`
                : "https://via.placeholder.com/400x300?text=No+Image";

              return (
                <div key={item._id} className="px-2">
                  <div className="relative group rounded-xl overflow-hidden shadow-lg h-72 md:h-80">
                    <div
                      className="h-full bg-cover bg-center relative transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${bgImage})` }}
                    >
                      {/* Property Type Badge */}
                      <div className="absolute top-3 left-3 bg-green-600/80 text-white px-3 py-1 rounded-full text-xs font-semibold z-10 backdrop-blur-sm">
                        {propertyType}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Link
                          to={`/${
                            item?.meta?.tags?.includes("Land")
                              ? "lands"
                              : item?.meta?.tags?.includes("Flat")
                              ? "flats"
                              : "houses"
                          }/${item._id}`}
                          className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-xl text-white text-lg font-semibold hover:bg-white/30 transition"
                        >
                          View Details
                        </Link>
                      </div>

                      {/* Info Bottom */}
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-sm md:text-base">
                        <p className="text-center">
                          {item.location?.mouja || "N/A"}{" "}
                          {isLand && item.landDetails?.landSizeKatha
                            ? `- ${item.landDetails.landSizeKatha} Katha`
                            : ""}
                          {isLand && item.pricing?.value
                            ? ` - ${item.pricing.value.toLocaleString()} BDT`
                            : ""}
                        </p>
                        {isFlat && (
                          <p>
                            Beds: {item.flatDetails?.bed || "N/A"}, Baths:{" "}
                            {item.flatDetails?.bath || "N/A"}, Balcony:{" "}
                            {item.flatDetails?.balcony || "N/A"}
                          </p>
                        )}
                        {isHouse && (
                          <p>
                            Land: {item.landDetails?.landSizeKatha || "N/A"}{" "}
                            Katha, Floors:{" "}
                            {item.landDetails?.totalFloors || "N/A"},
                            Units/Flat:{" "}
                            {item.houseDetails?.unitsPerFlat || "N/A"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default HomeFeaturedProperties;
