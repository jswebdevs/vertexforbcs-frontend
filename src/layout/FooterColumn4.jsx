import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const FooterColumn4 = () => (
  <div>
    <h3 className="text-white font-bold mb-4">Contact Us</h3>
    <ul className="text-gray-300 space-y-2">
      <li>
        <FaMapMarkerAlt className="inline-block mr-2" /> Office Address: 1234
        Street Name
      </li>
      <li>
        <FaPhoneAlt className="inline-block mr-2" /> Call: +1234567890
      </li>
      <li>
        <FaWhatsapp className="inline-block mr-2" /> WhatsApp: +1234567890
      </li>
      <li>
        <FaEnvelope className="inline-block mr-2" /> Email: contact@company.com
      </li>
    </ul>
  </div>
);


export default FooterColumn4;