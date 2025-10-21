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
  <footer className="bg-gray-800 pt-10  ">
    <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-300">
      <div>
        <img src={logo} alt="Logo" className="w-[150px] mb-4 max-w-[150px]" />
      </div>

      {/* QUICK LINKS */}
      <div>
        <h3 className="text-white font-bold mb-4">Quick Links</h3>
        <ul className="text-gray-300 space-y-2">
          <li>
            <a
              href="/link1"
              className="inline-block transform transition duration-200 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/link2"
              className="inline-block transform transition duration-200 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/link3"
              className="inline-block transform transition duration-200 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Courses
            </a>
          </li>
          <li>
            <a
              href="/link4"
              className="inline-block transform transition duration-200 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>

      {/* OTHER LINKS */}
      <div>
        <h3 className="text-white font-bold mb-4">Other Links</h3>
        <ul className="text-gray-300 space-y-2">
          <li>
            <li>
              <a
                href={link.href}
                className="inline-block transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1"
              >
                {link.name}
              </a>
            </li>
            <a
              href="/terms"
              className="inline-block transform transition duration-200 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="/privacy"
              className="inline-block transform transition duration-200 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/support"
              className="inline-block transform transition duration-200 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Support
            </a>
          </li>
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
          <li>
            <FaEnvelope className="inline-block mr-2" /> Email:
            contact@company.com
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
