import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Trash2, FileText, PlayCircle } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const MediaLibrary = ({ multiple = true, onSelect, onClose }) => {
  const [media, setMedia] = useState([]);
  const [selectedInternal, setSelectedInternal] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const loader = useRef(null);
  const fileInputRef = useRef(null);

  // Reset media & page when filter changes
  useEffect(() => {
    setMedia([]);
    setPage(1);
    setAllLoaded(false);
  }, [filter]);

  const loadMedia = useCallback(async () => {
    if (loading || allLoaded) return;
    setLoading(true);

    try {
      let typeQuery = "";
      if (filter === "photos") typeQuery = "image";
      else if (filter === "videos") typeQuery = "video";
      else if (filter === "documents") typeQuery = "docs";

      const res = await axios.get(
        `https://rajproperty-backend-1.onrender.com/api/media?page=${page}&limit=${limit}${
          typeQuery ? `&type=${typeQuery}` : ""
        }`
      );

      const newMedia = res.data.media || [];

      // Deduplicate
      setMedia((prev) => [
        ...prev,
        ...newMedia.filter((nm) => !prev.find((m) => m._id === nm._id)),
      ]);

      setTotal(res.data.total || 0);

      if (
        !newMedia.length ||
        media.length + newMedia.length >= res.data.total
      ) {
        setAllLoaded(true);
      }
    } catch (err) {
      console.error("Error loading media:", err);
      alert("Failed to load media. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, filter, loading, media.length, allLoaded]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append("files", file));

      await axios.post(
        "https://rajproperty-backend-1.onrender.com/api/media",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      setMedia([]); // Clear media to force reload
      setPage(1);
      setAllLoaded(false);
      await loadMedia(); // Refresh media list
    } catch (err) {
      console.error("Upload failed:", err);
      alert(err.response?.data?.error || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const toggleSelect = (item) => {
    if (multiple) {
      setSelectedInternal((prev) =>
        prev.find((i) => i._id === item._id)
          ? prev.filter((i) => i._id !== item._id)
          : [...prev, item]
      );
    } else {
      setSelectedInternal([item]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media?")) return;
    try {
      await axios.delete(
        `https://rajproperty-backend-1.onrender.com/api/media/${id}`
      );
      setMedia((prev) => prev.filter((item) => item._id !== id));
      setSelectedInternal((prev) => prev.filter((item) => item._id !== id));
      setTotal((prev) => prev - 1);
    } catch (err) {
      console.error("Error deleting media:", err);
      alert("Failed to delete media. Please try again.");
    }
  };

  const bulkDelete = async () => {
    if (!window.confirm("Delete all selected media?")) return;
    try {
      await Promise.all(selectedInternal.map((item) => handleDelete(item._id)));
      setSelectedInternal([]);
    } catch (err) {
      console.error("Bulk delete failed:", err);
      alert("Failed to delete some media. Please try again.");
    }
  };

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !allLoaded) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading, allLoaded]);

  // ✅ Fixed URL correction (no path dependency)
  const getCorrectUrl = (url, folder) => {
    if (!url) return null;

    const fileName = url.split("/").pop();

    if (url.startsWith("/uploads")) return url;

    return `/uploads/${folder}/${fileName}`;
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex space-x-4 mb-4">
        {["all", "photos", "videos", "documents"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`btn ${filter === t ? "btn-accent" : "btn-outline"}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedInternal.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <span>{selectedInternal.length} selected</span>
          <button
            onClick={bulkDelete}
            className="btn btn-sm btn-error flex items-center gap-1"
          >
            <Trash2 size={16} /> Delete Selected
          </button>
        </div>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-5 gap-4">
        {media.map((item) => {
          const isSelected = selectedInternal.find((i) => i._id === item._id);
          const url = getCorrectUrl(item.url, item.folder);
          const thumbUrl = getCorrectUrl(item.thumbUrl, item.folder);

          return (
            <div
              key={item._id}
              className={`group relative border rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 ${
                isSelected ? "ring-4 ring-blue-500" : ""
              }`}
              onClick={() => toggleSelect(item)}
            >
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id);
                }}
                className="absolute top-2 right-2 hidden group-hover:flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full shadow hover:bg-red-700 z-10 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>

              {/* Thumbnail */}
              {item.mimeType.startsWith("image/") && (
                <LazyLoadImage
                  src={`https://rajproperty-backend-1.onrender.com${
                    thumbUrl || url
                  }`}
                  alt={item.originalName}
                  className="w-full h-32 object-cover"
                  effect="blur"
                />
              )}

              {item.mimeType.startsWith("video/") && (
                <div className="relative w-full h-32">
                  <LazyLoadImage
                    src={`https://rajproperty-backend-1.onrender.com${
                      thumbUrl || url
                    }`}
                    alt={item.originalName}
                    className="w-full h-32 object-cover"
                    effect="blur"
                  />
                  <PlayCircle className="absolute inset-0 m-auto w-12 h-12 text-white opacity-80 pointer-events-none" />
                </div>
              )}

              {!item.mimeType.startsWith("image/") &&
                !item.mimeType.startsWith("video/") && (
                  <div className="flex flex-col items-center justify-center h-32 bg-gray-200 text-sm text-center p-1">
                    <FileText size={32} />
                    <span className="truncate mt-1 text-xs">
                      {item.originalName}
                    </span>
                  </div>
                )}

              {/* Title */}
              <div className="p-2 text-xs text-center truncate bg-gray-50 text-gray-950">
                {item.originalName}
              </div>
            </div>
          );
        })}
      </div>

      {/* Loader for Infinite Scroll */}
      <div ref={loader} className="h-16 flex justify-center items-center">
        {loading && !allLoaded && (
          <div className="loader border-t-4 border-blue-500 w-8 h-8 rounded-full animate-spin"></div>
        )}
        {!loading && allLoaded && media.length === 0 && (
          <span className="text-gray-500">No media found</span>
        )}
      </div>

      {/* Done Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            if (onSelect) onSelect(selectedInternal);
            if (onClose) onClose();
          }}
          className="btn btn-primary"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default MediaLibrary;
