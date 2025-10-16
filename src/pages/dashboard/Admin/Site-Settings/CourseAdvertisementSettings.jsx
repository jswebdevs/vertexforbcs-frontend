import { useEffect, useState } from "react";

const CourseAdvertisementSettings = () => {
  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
  });
  const [showSuccess, setShowSuccess] = useState(false); // Success popup state

  // Fetch current course data from the API
  useEffect(() => {
    fetch("https://vertexforbcs.com/vartexforbcs/web/home-courses")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setFormData({
            heading: data[0].heading,
            subheading: data[0].subheading,
          });
        } else {
          console.error("No data received from the API.");
        }
      })
      .catch((error) => console.error("Error fetching data:", error)); // Log fetching errors
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    

    // API request to update the course advertisement
    fetch("https://vertexforbcs.com/vartexforbcs/web/home-courses/update/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
          console.log("Data successfully updated.");
        } else {
          console.error(
            "Failed to update data:",
            response.status,
            response.statusText
          );
        }
      })
      .catch((error) => console.error("Error updating course:", error)); // Log updating errors
  };

  return (
    <div className="flex mx-auto mt-10">
      {/* Left Side: Course Section Heading */}
      <div className="w-1/3">
        <h2 className="text-2xl font-bold mb-4">Course Advertisement</h2>
      </div>

      {/* Right Side: Current Heading, Subheading and Update Button */}
      <div className="w-2/3">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Current Heading
          </label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            placeholder="Enter course heading"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Current Subheading
          </label>
          <textarea
            name="subheading"
            value={formData.subheading}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            rows="4"
            placeholder="Enter course subheading"
          ></textarea>
        </div>

        {/* Update Changes Button */}
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Update Changes
        </button>

        {/* Success Popup */}
        {showSuccess && (
          <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            Successfully updated!
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseAdvertisementSettings;
