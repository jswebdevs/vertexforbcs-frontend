import { Home, Building, Star } from "lucide-react";

const HomePageServices = () => {
  const services = [
    {
      icon: <Home className="w-12 h-12 text-cyan-400" />,
      title: "Property Listing",
      description:
        "Explore a wide range of lands, flats, and houses across different locations.",
    },
    {
      icon: <Building className="w-12 h-12 text-green-400" />,
      title: "Property Management",
      description:
        "Manage your properties efficiently with our dedicated support and tools.",
    },
    {
      icon: <Star className="w-12 h-12 text-yellow-400" />,
      title: "Premium Services",
      description:
        "Get featured listings, expert guidance, and top-notch property solutions.",
    },
  ];

  return (
    <div className="px-[5%] py-16 bg-[#0b0b0b] text-gray-200">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Our Services
        </h2>
        <p className="text-gray-400 mt-2 text-lg">What do we do?</p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-8 rounded-3xl 
                       bg-gradient-to-br from-[#111111]/80 via-[#1a1a1a]/70 to-[#111111]/80
                       border border-gray-800 backdrop-blur-md shadow-lg hover:shadow-cyan-500/30 
                       transition-transform transform hover:-translate-y-3 duration-300"
          >
            <div className="mb-5">{service.icon}</div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageServices;
