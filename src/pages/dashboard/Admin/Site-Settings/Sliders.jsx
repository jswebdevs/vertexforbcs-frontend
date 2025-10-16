import { useState, useEffect, useRef } from "react";

const Sliders = () => {
  const [sliders, setSliders] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [newsrc, setNewsrc] = useState(null); // To store the selected image file
  const [newTitle, setNewTitle] = useState(""); // Title and Alt are the same
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [srcToDelete, setsrcToDelete] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null); // To track zoomed image

  const addPopupRef = useRef(null); // For detecting clicks outside popup
  const deletePopupRef = useRef(null); // For detecting clicks outside delete popup

  // Fetch existing sliders from the server
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(
          "https://vertexforbcs.com/vartexforbcs/web/sliders"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setSliders(data);
        } else {
          console.error("Unexpected data format:", data);
          setSliders([]);
        }
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

    fetchSliders();
  }, []);

  // Handle opening and closing of popups
  const openAddPopup = () => setIsAddPopupOpen(true);
  const closeAddPopup = () => {
    setIsAddPopupOpen(false);
    setNewsrc(null);
    setNewTitle(""); // Reset title (and alt since it's the same)
  };

  const openDeletePopup = (slider) => {
    setsrcToDelete(slider);
    setIsDeletePopupOpen(true);
  };
  const closeDeletePopup = () => setIsDeletePopupOpen(false);

  const handleZoomImage = (slider) => setZoomedImage(slider);
  const closeZoomImage = () => setZoomedImage(null);

  // Handle file input and title (alt text is same as title)
  const handleFileChange = (e) => setNewsrc(e.target.files[0]);
  const handleTitleChange = (e) => setNewTitle(e.target.value);

  // Add new slider
  const handleAddSlider = () => {
    if (newsrc && newTitle) {
      const formData = new FormData();

      // Append the image file to formData
      formData.append("image", newsrc); // 'image' is the key used for the image

      // Append alt and title (same value for both)
      formData.append("alt", newTitle); // Alt text is same as title
      formData.append("title", newTitle); // Title

      fetch("https://vertexforbcs.com/vartexforbcs/web/sliders", {
        method: "POST",
        body: formData, // Send the form data (image and other fields)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.model) {
            setSliders([...sliders, data.model]); // Add the new slider
            closeAddPopup();
          } else {
            console.error(
              "Failed to save Image:",
              data?.error || "No data returned"
            );
          }
        })
        .catch((error) =>
          console.error("Error while uploading the image:", error)
        );
    }
  };

  // Delete slider image
  const handleDeletesrc = () => {
    fetch(
      `https://vertexforbcs.com/vartexforbcs/web/slider/delete/${srcToDelete.id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          setSliders(sliders.filter((slider) => slider.id !== srcToDelete.id));
          closeDeletePopup(); // Close popup
        } else {
          console.error("Failed to delete image.");
        }
      })
      .catch((error) => console.error("Error deleting image:", error));
  };

  // Handle closing the popup when clicking outside
  const handleOutsideClick = (e) => {
    if (
      isAddPopupOpen &&
      addPopupRef.current &&
      !addPopupRef.current.contains(e.target)
    ) {
      closeAddPopup();
    }
    if (
      isDeletePopupOpen &&
      deletePopupRef.current &&
      !deletePopupRef.current.contains(e.target)
    ) {
      closeDeletePopup();
    }
  };

  useEffect(() => {
    if (isAddPopupOpen || isDeletePopupOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    } else {
      window.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [isAddPopupOpen, isDeletePopupOpen]);

  return (
    <div className="flex justify-between p-4">
      {/* Sliders (left) */}
      <div className="w-full">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl mb-4">All Sliders</h2>
          </div>
          <div className="w-1/4  items-center">
            <button
              className="bg-green-500 py-2 px-4 rounded text-white"
              onClick={openAddPopup}
            >
              Add New Slider
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {sliders.length === 0 ? (
            <p>No sliders available. Please add a new slider images.</p>
          ) : (
            sliders.map((slider) => (
              <div
                key={slider.id}
                className="relative group cursor-pointer"
                onClick={() => handleZoomImage(slider)}
              >
                <img
                  src={slider.src}
                  alt={slider.alt}
                  className="w-full h-auto rounded"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeletePopup(slider);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add new Slider button (right) */}

      {/* Add Slider Popup */}
      {isAddPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={addPopupRef} className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-black">Add New Slider</h3>
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-2 text-black"
            />
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              placeholder="Enter title (this will also be used as alt text)"
              className="border border-gray-300 rounded p-2 w-full mb-2"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                onClick={handleAddSlider}
              >
                Add Slider
              </button>
              <button
                className="bg-gray-500 text-white py-1 px-3 rounded"
                onClick={closeAddPopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={deletePopupRef} className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-2 text-black">
              Are you sure you want to delete this slider?
            </h3>
            <img src={srcToDelete.src} alt={srcToDelete.alt} className="mb-2" />
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white py-1 px-3 rounded mr-2"
                onClick={handleDeletesrc}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 text-white py-1 px-3 rounded"
                onClick={closeDeletePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Zoomed Image Popup */}
      {zoomedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              className="max-w-full max-h-full"
            />
            <button
              className="absolute top-0 right-0 bg-white text-black py-1 px-3 rounded"
              onClick={closeZoomImage}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sliders;
