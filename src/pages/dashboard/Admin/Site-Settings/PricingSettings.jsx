import { useEffect, useState } from "react";
import PackageTableSettings from "./PackageTableSettings";

const PricingSettings = () => {
  const [headerData, setHeaderData] = useState({
    header: "",
    subheader: "",
  });
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({
    packageName: "",
    packageDetails: "",
    price: "",
    features: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [showAddPackagePopup, setShowAddPackagePopup] = useState(false);

  useEffect(() => {
    fetch("https://vertexforbcs.com/vartexforbcs/web/pricing/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.header && data.subheader) {
          setHeaderData({
            header: data.header,
            subheader: data.subheader,
          });
        }
        if (data.packages) {
          setPackages(data.packages || []);
        }
      })
      .catch((error) => console.error("Error fetching pricing data:", error));
  }, []);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaderData({ ...headerData, [name]: value });
  };

  const handleUpdateHeader = () => {
    setErrorMessages({}); // Reset errors before sending request
    console.log("Sending header data:", headerData); // Console log for sending data
    fetch(
      "https://vertexforbcs.com/vartexforbcs/web/pricing/header-subheader/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(headerData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          console.log("Header and subheader updated.");
        } else if (data.error) {
          setShowError(true);
          setErrorMessages(data.error);
          setTimeout(() => setShowError(false), 3000);
          console.error("Validation error:", data.error);
        }
      })
      .catch((error) => {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        console.error("Error updating header:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackage({ ...newPackage, [name]: value });
  };

  const handleAddPackage = () => {
    console.log("Sending package data:", newPackage); // Console log for sending data
    fetch("https://vertexforbcs.com/vartexforbcs/web/pricing/package/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPackage),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPackages((prevPackages) => [...prevPackages, newPackage]);
          setNewPackage({
            packageName: "",
            packageDetails: "",
            price: "",
            features: "",
          });
          setShowAddPackagePopup(false);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          console.log("Package added successfully.");
        } else {
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
          console.error("Error adding package:", data.message);
        }
      })
      .catch((error) => {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        console.error("Error adding package:", error);
      });
  };

  const handleDeletePackage = (id) => {
    fetch(
      `https://vertexforbcs.com/vartexforbcs/web/pricing/package/delete/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPackages((prevPackages) =>
            prevPackages.filter((pkg) => pkg.id !== id)
          );
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
          console.log("Package deleted successfully.");
        } else {
          setShowError(true);
          setTimeout(() => setShowError(false), 3000);
          console.error("Error deleting package:", data.message);
        }
      })
      .catch((error) => {
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        console.error("Error deleting package:", error);
      });
  };

  return (
    <div className="p-6">
      {/* Header and Subheader Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Package Settings</h2>
        <div className="mb-4">
          <label className="block text-white text-lg font-semibold mb-2">
            Header
          </label>
          <input
            type="text"
            name="header"
            value={headerData.header}
            onChange={handleHeaderChange}
            className="w-full p-2 border border-gray-300 rounded-lg placeholder-black"
            placeholder="Enter header"
          />
          {errorMessages.header && (
            <p className="text-red-500">{errorMessages.header.join(", ")}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-white text-lg font-semibold mb-2">
            Subheader
          </label>
          <input
            type="text"
            name="subheader"
            value={headerData.subheader}
            onChange={handleHeaderChange}
            className="w-full p-2 border border-gray-300 rounded-lg placeholder-black"
            placeholder="Enter subheader"
          />
          {errorMessages.subheader && (
            <p className="text-red-500">{errorMessages.subheader.join(", ")}</p>
          )}
        </div>
        <button
          onClick={handleUpdateHeader}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Update Header & Subheader
        </button>
      </div>
      
      <PackageTableSettings></PackageTableSettings>
      {/* Packages Section */}
      {/* The rest of your component remains the same */}
    </div>
  );
};

export default PricingSettings;
