import { useEffect, useState } from "react";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(9); // Display 9 images per page

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://vertexforbcs.com/vartexforbcs/web/gallery/view"
      ); // Update with the correct path to your JSON file
      const result = await response.json();
      setImages(result);
    };
    fetchData();
  }, []);

  // Get current images
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(images.length / imagesPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Gallery</h1>
      <h2 className="text-xl text-center text-gray-600">গ্যালারি</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {currentImages.map((image) => (
          <div key={image.id} className="rounded-lg overflow-hidden shadow-lg">
            <img src={image.src} alt={image.alt} className="w-full h-auto" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
