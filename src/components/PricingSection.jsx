import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [pricingData, setPricingData] = useState({
    header: "",
    subheader: "",
    packages: [],
  });

  useEffect(() => {
    fetch("/pricing.json") // Ensure this path is correct
      .then((response) => response.json())
      .then((data) => setPricingData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-[80%] md:w-[80%] mx-auto mt-10 mb-10 ">
      {/* Fetch header and subheader from the JSON */}
      <h2 className="text-2xl font-bold text-center text-white">
        {pricingData.header}
      </h2>
      <p className="text-center mb-5 text-white">{pricingData.subheader}</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {pricingData.packages.map((plan) => (
          <div
            key={plan.id}
            className="bg-white shadow-md rounded-lg p-6 transition-colors duration-300 hover:bg-green-500 hover:text-white text-black group" // Added group for handling child hover styles
          >
            <h3 className="text-xl font-semibold mb-2">{plan.packageName}</h3>
            <p className="text-gray-600 mb-4">{plan.packageDetails}</p>
            <p className="text-2xl font-bold mb-4">৳{plan.price}</p>{" "}
            {/* Adjusted currency symbol */}
            <ul className="list-none mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center mb-2">
                  {/* Circle with white tick and green background */}
                  <span className="w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full mr-2 transition-all duration-300 group-hover:bg-white group-hover:text-green-500">
                    ✓
                  </span>
                  <span className="text-gray-600 transition-colors duration-300 group-hover:text-white">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-green-500 text-white py-2 rounded transition-colors duration-300 group-hover:bg-white group-hover:text-green-500 border-2 border-green-500">
              <Link to="/contact">Buy Now</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSection;
