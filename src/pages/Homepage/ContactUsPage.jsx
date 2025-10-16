import { useState, useEffect } from "react";

const ContactUsPage = () => {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    fetch("/contactus.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setContactData(data);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  }, []);

  return (
    <div className="justify-center">
      {/* Contact Information */}
      <div className="p-4 flex justify-center">
        <div className="flex flex-wrap justify-center max-w-6xl">
          {contactData.map((item) => (
            <div
              key={item.id}
              className="bg-green-600 shadow-md rounded-lg m-4 p-4 w-[300px] flex items-center"
            >
              <img
                src={item.icon}
                alt={item.title}
                className="w-16 h-16 mr-4" // Bigger icons
              />
              <div>
                <a href={item.link}>
                  <h3 className="text-black text-lg font-semibold">
                    {item.title}
                  </h3>
                  <h2 className="text-black text-base">{item.value}</h2>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="flex justify-center items-center mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.15011979011518!2d88.59652911480981!3d24.367318001943005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa9b8c5a4e1%3A0xa4f228bc8ca5245b!2sVertex%20For%20BCS!5e0!3m2!1sen!2sbd!4v1728217308337!5m2!1sen!2sbd"
          className="w-full h-[70vh] rounded-lg border-0" // Full width and 70vh height
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUsPage;
