import { Link, useNavigate } from "react-router";
import video from "../../assets/vid/heroBG.mp4";
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const [propertyType, setPropertyType] = useState("");
  const [mouja, setMouja] = useState("");
  const [price, setPrice] = useState("");

  const [moujas, setMoujas] = useState([]);
  const [filteredMoujas, setFilteredMoujas] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const moujaRef = useRef(null);

  useEffect(() => {
    fetch("/areas.json")
      .then((res) => res.json())
      .then((data) => {
        const allMoujas = data.flatMap((item) => item.mouja || []);
        setMoujas(allMoujas);
      });
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moujaRef.current && !moujaRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMoujaChange = (e) => {
    const value = e.target.value;
    setMouja(value);

    if (!value.trim()) {
      setFilteredMoujas([]);
      setShowDropdown(false);
      return;
    }

    const filtered = moujas.filter((m) =>
      m.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMoujas(filtered);
    setShowDropdown(true);
  };

  const handleApplyFilter = () => {
    const newErrors = {};
    if (!propertyType) newErrors.propertyType = "Please select a property type";
    if (!mouja) newErrors.mouja = "Please enter a mouja";
    if (!price) newErrors.price = "Please enter a maximum price";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const queryParams = new URLSearchParams({
      propertyType,
      mouja,
      price,
    });
    navigate(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        src={video}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
          Where Trust Meets
        </h1>
        <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
          Property
        </h1>
        <p className="mt-4 text-lg md:text-xl drop-shadow">
          Seamless solutions for buying and selling properties.
        </p>

        <p className="mt-4 text-yellow-400 text-2xl">★★★★★</p>
        <p className="uppercase mt-1 text-sm md:text-base">
          Trusted by countless satisfied clients
        </p>

        {/* Filter Box */}
        <div className="mt-10 w-full max-w-4xl">
          <div className="backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl bg-white/10 border border-white/20">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center drop-shadow capitalize">
              Find What You Need
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Property Type */}
              <div className="flex-1">
                <label className="block text-gray-200 mb-1">
                  Property Type*
                </label>
                <select
                  className="w-full p-3 rounded-lg bg-base-200 text-white placeholder-gray-300 border border-gray-400 focus:ring-2 focus:ring-green-600 focus:outline-none"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="land">Land</option>
                  <option value="flat">Flat</option>
                  <option value="house">House</option>
                </select>
                {errors.propertyType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.propertyType}
                  </p>
                )}
              </div>

              {/* Mouja */}
              <div className="flex-1 relative" ref={moujaRef}>
                <label className="block text-gray-200 mb-1">Area*</label>
                <input
                  type="text"
                  value={mouja}
                  onChange={handleMoujaChange}
                  placeholder="Type mouja..."
                  className="w-full p-3 rounded-lg bg-base-200 text-white border border-gray-400 focus:ring-2 focus:ring-green-600 focus:outline-none"
                />
                {showDropdown && (
                  <ul className="absolute z-20 w-full max-h-40 overflow-y-auto bg-white/20 backdrop-blur-md rounded shadow-lg mt-1">
                    {filteredMoujas.length > 0 ? (
                      filteredMoujas.map((m, idx) => (
                        <li
                          key={idx}
                          className="px-3 py-2 cursor-pointer hover:bg-green-600/40 transition"
                          onClick={() => {
                            setMouja(m);
                            setShowDropdown(false);
                          }}
                        >
                          {m}
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-gray-300">No results</li>
                    )}
                  </ul>
                )}
                {errors.mouja && (
                  <p className="text-red-500 text-sm mt-1">{errors.mouja}</p>
                )}
              </div>

              {/* Price */}
              <div className="flex-1">
                <label className="block text-gray-200 mb-1">Max Price*</label>
                <input
                  type="number"
                  placeholder="Enter max price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 rounded-lg bg-base-200 text-white border border-gray-400 focus:ring-2 focus:ring-green-600 focus:outline-none"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleApplyFilter}
              className="mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 py-3 rounded-xl text-white font-semibold hover:from-green-500 hover:to-green-600 transition"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
