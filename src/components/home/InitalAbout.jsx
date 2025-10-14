import img from "../../assets/img/aboutInitial.avif";

const InitialAbout = () => {
  return (
    <section className="px-[5%] py-16 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side (text with subtle glass effect) */}
        <div className="p-6 md:p-12 rounded-3xl bg-white/80 backdrop-blur-md shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 tracking-tight">
            Your Trusted Real Estate Partner
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Looking for the perfect land, house, or apartment in Rajshahi?
            RajProperty is your trusted real estate partner, offering reliable
            and transparent property solutions tailored to your needs. Whether
            you want to buy a residential plot, a ready apartment, or a
            commercial space, we provide the best deals with complete legal
            assurance.
          </p>
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            Connect
          </button>
        </div>

        {/* Right side (image with hover scale effect) */}
        <div className="flex justify-center md:justify-end">
          <img
            src={img}
            alt="About"
            className="w-full max-w-md rounded-3xl shadow-2xl transition-transform transform hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default InitialAbout;
