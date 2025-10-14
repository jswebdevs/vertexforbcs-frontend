import { Link } from "react-router-dom";
import logo from "../../assets/img/footerlogo.png";

const Footer = () => {
  return (
    <div className="bg-[#0b0b0b] text-gray-300 border-t border-gray-800">
      {/* Main Footer */}
      <footer className="w-full mx-auto flex flex-col md:flex-row justify-between py-12 px-6 md:px-[5%] gap-10 md:gap-0">
        {/* Left: Logo + Description */}
        <aside className="flex-1 lg:max-w-1/2 pe-12">
          <img src={logo} alt="Raj Property Logo" className="h-12 mb-4" />
          <p className="leading-relaxed text-gray-400">
            <span className="text-white font-semibold">Raj Property</span>
            <br />
            Where Trust Meets Property.
            <br />
            Find your next home or commercial property in Rajshahi with us. Your
            property decisions should be safe, easy, and reliable.
            <br />
            Contact us for property choices, sales, rentals, or expert advice.
          </p>
        </aside>

        {/* Links Section */}
        <div className="flex flex-1 flex-col sm:flex-row justify-between gap-10 md:gap-16">
          {/* Company Links */}
          <nav className="flex flex-col gap-2">
            <h6 className="text-white font-semibold text-lg mb-3">Company</h6>
            {[
              "About Us",
              "All Properties",
              "Featured",
              "Latest",
              "Contact",
            ].map((link, i) => (
              <Link
                key={i}
                to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-green-400 transition-colors duration-300"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Legal Links */}
          <nav className="flex flex-col gap-2">
            <h6 className="text-white font-semibold text-lg mb-3">Legal</h6>
            {[
              "Agreements",
              "Terms of Service",
              "Privacy Policy",
              "Cookie Policy",
              "FAQ",
            ].map((link, i) => (
              <Link
                key={i}
                to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:text-green-400 transition-colors duration-300"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>
      </footer>

      {/* Bottom Bar */}
      <footer className="bg-[#111] text-gray-400 p-4 border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-2 md:gap-0">
          <p>© 2020 - {new Date().getFullYear()} — All rights reserved</p>
          <p>
            Designed by{" "}
            <a
              href="http://www.facebook.com/jswebdevs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-500 font-medium transition-colors duration-300"
            >
              JS Web Devs
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
