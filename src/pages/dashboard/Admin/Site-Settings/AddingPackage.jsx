import { useEffect, useRef, useState } from "react";

const AddingPackage = ({ onAddPackage, onClose }) => {
  const [packageName, setPackageName] = useState("");
  const [packageDetails, setPackageDetails] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState("");
  const popupRef = useRef(null); // Reference for the popup

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split features by comma and wrap each feature in quotes
    const featureArray = features.split(",").map((feature) => feature.trim());

    const newPackage = {
      packageName,
      packageDetails,
      price,
      duration,
      features: JSON.stringify(featureArray), // Format features as JSON array string
    };

    console.log("Sending data:", newPackage); // Log the data being sent

    // POST request to create a new package
    fetch("https://vertexforbcs.com/vartexforbcs/web/pricing/package/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPackage),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create package");
        }
        return response.json(); // Return the response data
      })
      .then((data) => {
        console.log("Package added successfully:", data); // Log the success message
        onAddPackage(data); // Add the new package to the list
        onClose(); // Close the popup after adding the package
      })
      .catch((error) => {
        console.error("Error adding package:", error); // Log the error message
      });
  };

  // Close the popup when clicking outside of it
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    // Add event listener to close the popup when clicking outside
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-[80vh] overflow-y-auto" // Set height and overflow
      >
        <h2 className="text-lg font-semibold mb-4">Add New Package</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-black">Package Name</label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-black">Package Details</label>
            <textarea
              value={packageDetails}
              onChange={(e) => setPackageDetails(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-black">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-black">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-black">
              Features (separated by commas)
            </label>
            <input
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="e.g., Feature 1, Feature 2, Feature 3"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Add Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddingPackage;
