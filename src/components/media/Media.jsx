import { useNavigate } from "react-router-dom";
import MediaLibrary from "./MediaLibrary";

const Media = () => {
  const navigate = useNavigate();

  return (
    <div className="px-[5%] py-5">
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-xl font-bold cursor-pointer hover:text-green-600 transition"
          onClick={() => navigate("/dashboard/media")}
        >
          Media Library
        </h2>
        <button
          className="btn btn-accent"
          onClick={() => navigate("/dashboard/media/upload")}
        >
          Upload Media
        </button>
      </div>

      <MediaLibrary />
    </div>
  );
};

export default Media;
