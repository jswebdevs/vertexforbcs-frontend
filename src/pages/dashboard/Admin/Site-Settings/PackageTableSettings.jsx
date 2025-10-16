import { useEffect, useState } from "react";
import AddingPackage from "./AddingPackage"; // Import the AddingPackage component
import AddingFeature from "./AddingFeature"; // Import the AddingFeature component for adding features

const PackageTableSettings = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingPackage, setIsAddingPackage] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [isAddingFeature, setIsAddingFeature] = useState(false); // State for adding features
  const [selectedFeaturePackageId, setSelectedFeaturePackageId] =
  useState(null); // For editing features

  useEffect(() => {
    fetch("https://vertexforbcs.com/vartexforbcs/web/pricing/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Parse the features string into an array if it's a string
        const parsedPackages = data.packages.map((pkg) => ({
          ...pkg,
          features:
            typeof pkg.features === "string"
              ? JSON.parse(pkg.features)
              : pkg.features,
        }));
        setPackages(parsedPackages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
        setError("Failed to load packages");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      fetch(`https://vertexforbcs.com/vartexforbcs/web/package/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setPackages((prevPackages) =>
              prevPackages.filter((pkg) => pkg.id !== id)
            );
          } else {
            throw new Error("Failed to delete the package");
          }
        })
        .catch((error) => {
          console.error("Error deleting package:", error);
          setError("Failed to delete package");
        });
    }
  };

  const handleAddPackage = (newPackage) => {
    setPackages((prevPackages) => [...prevPackages, newPackage]);
  };

  const handleAddFeature = (packageId) => {
    setSelectedPackageId(packageId);
    setIsAddingFeature(true);
  };

  const handleFeatureAdded = () => {
    setIsAddingFeature(false);
    setSelectedPackageId(null);
  };

  const handleEditFeature = (packageId) => {
    setSelectedFeaturePackageId(packageId);
    setIsAddingFeature(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Package Table</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => setIsAddingPackage(true)}
        >
          Add a Package
        </button>
      </div>

      {packages.length === 0 ? (
        <div className="p-4 text-center text-gray-600">
          There are currently no packages. Please create one.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Package Name</th>
                <th className="border border-gray-300 p-2">Package Details</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Duration</th>
                <th className="border border-gray-300 p-2">Features</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="border border-gray-300 p-2">
                    {pkg.packageName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {pkg.packageDetails}
                  </td>
                  <td className="border border-gray-300 p-2">{pkg.price}</td>
                  <td className="border border-gray-300 p-2">{pkg.duration}</td>
                  <td className="border border-gray-300 p-2">
                    {Array.isArray(pkg.features) && pkg.features.length > 0 ? (
                      <>
                        {pkg.features.join(", ")}
                        <button
                          onClick={() => handleEditFeature(pkg.id)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded ml-2 hover:bg-yellow-600 transition duration-300"
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleAddFeature(pkg.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-300"
                      >
                        Add Feature
                      </button>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2 flex space-x-2">
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isAddingPackage && (
        <AddingPackage
          onAddPackage={handleAddPackage}
          onClose={() => setIsAddingPackage(false)}
        />
      )}

      {isAddingFeature && (
        <AddingFeature
          packageId={selectedPackageId || selectedFeaturePackageId}
          onClose={handleFeatureAdded}
        />
      )}
    </div>
  );
};

export default PackageTableSettings;
