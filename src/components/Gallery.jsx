import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://vertexforbcs.com/vartexforbcs/web/gallery/view") // Fetching image data from the JSON file
      .then((response) => response.json())
      .then((data) => {
        // Sort images by date (if date field exists) and slice to get the latest 6 images
        const sortedImages = data.slice(0, 6); // Assuming data is already sorted in the correct order
        setImages(sortedImages);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-[80%] mx-auto mt-10 mb-10">
      <h2 className="text-2xl font-bold text-center mb-2">Our Gallery</h2>
      <p className="text-center mb-10">
        Check out the latest highlights from our events and activities.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-lg">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition-colors duration-300">
          <Link to="/gallery"> View More </Link>
        </button>
      </div>
    </div>
  );
};

export default Gallery;
