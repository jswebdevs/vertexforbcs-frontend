import { Link } from "react-router";
import { motion } from "framer-motion";
import logo from "/footer.png";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const SiteFooter = () => (
  <motion.footer
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="bg-white dark:bg-gray-900 pt-12 text-gray-700 dark:text-gray-300"
  >
    {/* GRID LAYOUT */}
    <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* LOGO */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-[160px] mb-4 transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Learn. Prepare. Achieve your goals with Vartex for BCS.
        </p>
      </div>

      {/* QUICK LINKS */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Quick Links
        </h3>
        <ul className="space-y-2">
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Courses", href: "/courses" },
            { name: "Contact Us", href: "/contact" },
          ].map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className="inline-block transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* OTHER LINKS */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Resources
        </h3>
        <ul className="space-y-2">
          {[
            { name: "FAQ", href: "/faq" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Support", href: "/support" },
          ].map((link, i) => (
            <li key={i}>
              <a
                href={link.href}
                className="inline-block transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* CONTACT INFO */}
      <div className="md:col-span-1 md:w-[120%]">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          Get In Touch
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <FaMapMarkerAlt className="text-red-500 dark:text-red-400 mr-3 mt-1" />
            <span>Office Address: 1234 Street Name</span>
          </li>
          <li className="flex items-center">
            <FaPhoneAlt className="text-green-500 dark:text-green-400 mr-3" />
            <span>Call: +1234567890</span>
          </li>
          <li className="flex items-center">
            <FaWhatsapp className="text-green-600 dark:text-green-400 mr-3" />
            <span>WhatsApp: +1234567890</span>
          </li>
          <li className="flex items-center">
            <FaEnvelope className="text-yellow-500 dark:text-yellow-400 mr-3" />
            <span>Email: contact@company.com</span>
          </li>
        </ul>
      </div>
    </div>

    {/* COPYRIGHT SECTION */}
    <div className="mt-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-center">
      <p className="text-lg font-medium">
        © {new Date().getFullYear()}{" "}
        <span className="font-bold">Vartex for BCS</span> — Designed by{" "}
        <a
          href="https://www.facebook.com/jswebdevs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-300 hover:text-white transition-colors duration-300"
        >
          JS Web Devs
        </a>
      </p>
    </div>
  </motion.footer>
);

export default SiteFooter;
