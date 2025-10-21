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
      <div>
        <h3 className="text-white font-bold mb-4">Other Links</h3>
        <ul className="text-gray-300 space-y-2">
          <li>
            <li>
              <a
                href="/faq"
                className="inline-block transform transition duration-200 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400"
              >
                FAQ
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
      <div>
        <h3 className="text-white font-bold mb-4">Contact Us</h3>
        <ul className="text-gray-300 space-y-2">
          <li>
            <FaMapMarkerAlt className="inline-block mr-2" /> Office Address:
            1234 Street Name
          </li>
          <li>
            <FaPhoneAlt className="inline-block mr-2" /> Call: +1234567890
          </li>
          <li>
            <FaWhatsapp className="inline-block mr-2 " /> WhatsApp: +1234567890
          </li>
          <li>
            <FaEnvelope className="inline-block mr-2" /> Email:
            contact@company.com
          </li>
        </ul>
      </div>
    </div>

    <div className="w-full bg-gray-600 text-white py-4 text-center mt-3">
      <p className="text-xl">
        &copy;Vartex for BCS | 2024, Designed by{" "}
        <a
          href="https://www.facebook.com/asthainsight79"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        Astha Insights
      </p>
    </div>
  </footer>
);

export default SiteFooter;
