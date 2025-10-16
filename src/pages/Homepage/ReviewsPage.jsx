import { useEffect, useState } from "react";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(12); // Display 12 reviews per page

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/reviews.json"); // Update with the correct path to your JSON file
      const result = await response.json();
      setReviews(result);
    };
    fetchData();
  }, []);

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Customer Reviews</h1>
      <h2 className="text-xl text-center text-gray-600">
        Know what our students say.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {currentReviews.map((review) => (
          <div key={review.id} className="rounded-lg border p-4 shadow-lg">
            <div className="flex items-center mb-2">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full mr-2"
              />
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-white">{review.designation}</p>
              </div>
            </div>
            <p className="text-gray-400">{review.text}</p>
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

export default ReviewsPage;
