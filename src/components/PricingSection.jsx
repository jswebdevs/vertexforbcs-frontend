import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const [pricingData, setPricingData] = useState({
    header: "",
    subheader: "",
    packages: [],
  });

  useEffect(() => {
    fetch("/pricing.json")
      .then((response) => response.json())
      .then((data) => setPricingData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#020202] via-[#0a0a0a] to-[#121212] text-white py-20 px-6 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-green-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-400/10 blur-3xl rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative text-center mb-16">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-lime-300 bg-clip-text text-transparent drop-shadow-lg">
          {pricingData.header || "Premium Subscriptions"}
        </h2>
        <p className="text-gray-400 mt-4 text-lg">
          {pricingData.subheader ||
            "Choose the best plan for your success and growth."}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {pricingData.packages.map((plan) => (
          <div
            key={plan.id}
            className={`group relative rounded-3xl p-8 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-green-400 hover:shadow-green-400/40 hover:bg-gradient-to-br hover:from-green-400/10 hover:to-emerald-400/5 ${
              plan.highlight
                ? "border-green-400/50 bg-gradient-to-br from-emerald-500/20 to-green-400/10"
                : ""
            }`}
          >
            {/* Inner glow overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 to-lime-400/5 rounded-3xl"></div>

            <h3 className="text-2xl font-bold mb-1 relative z-10">
              {plan.packageName}
            </h3>
            <p className="text-gray-400 mb-4 relative z-10">
              {plan.packageDetails}
            </p>

            <div className="text-4xl font-extrabold mb-6 text-emerald-400 relative z-10">
              ৳{plan.price}
            </div>

            <ul className="space-y-3 mb-8 text-sm text-gray-300 relative z-10">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center space-x-2 transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/30 text-emerald-300 group-hover:bg-emerald-400 group-hover:text-white transition-all duration-300">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className={`block text-center py-3 rounded-xl font-semibold text-base transition-all duration-500 border relative z-10 ${
                plan.highlight
                  ? "bg-emerald-400 text-gray-900 border-emerald-400 hover:bg-emerald-500 hover:text-white"
                  : "border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-white"
              }`}
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="relative text-center text-gray-500 mt-14 text-sm">
        All subscriptions include 24×7 support & 14-day refund guarantee.
      </p>
    </section>
  );
};

export default PricingSection;
