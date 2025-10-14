import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { XCircle, UploadCloud, Image, FileVideo, FileText } from "lucide-react";

const MediaUpload = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const formatSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(2)} MB`;
  };

  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles).map((file) => ({
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : file.type.startsWith("video/")
        ? URL.createObjectURL(file)
        : null,
    }));
    setFiles(fileArray);
    setProgress({});
  };

  const handleFileChange = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return alert("Select files to upload");

    setUploading(true);
    const newProgress = {};
    const uploaded = [];

    for (let i = 0; i < files.length; i++) {
      const { file } = files[i];
      const formData = new FormData();
      formData.append("media", file);

      try {
        await axios.post(
          "https://rajproperty-backend-1.onrender.com/api/media/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (event) => {
              const percentCompleted = Math.round(
                (event.loaded * 100) / event.total
              );
              newProgress[file.name] = percentCompleted;
              setProgress({ ...newProgress });
            },
          }
        );
        uploaded.push(file.name);
      } catch (err) {
        console.error(`Upload failed for ${file.name}:`, err);
        alert(`Upload failed for ${file.name}`);
      }
    }

    setUploading(false);
    if (uploaded.length > 0) navigate("/dashboard/media");
  };

  return (
    <div className="px-[5%] py-8 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Upload Media</h2>

      {/* Drag & Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileInputRef.current.click()}
        className={`border-2 border-dashed rounded-lg p-8 w-full transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
          dragOver
            ? "border-green-500 bg-green-50/10"
            : "border-gray-400 bg-base-200"
        }`}
      >
        <UploadCloud size={40} className="text-green-400 mb-3" />
        <p className="text-white mb-1 font-medium">
          Drag & drop files here or click to browse
        </p>
        <p className="text-sm text-gray-300">
          Supports images, videos, and documents
        </p>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <div className="space-y-4">
          {files.map(({ file, preview }, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white/10 p-3 rounded-lg backdrop-blur-md shadow-sm border border-gray-700"
            >
              <div className="w-16 h-16 rounded-md overflow-hidden flex items-center justify-center bg-gray-900">
                {file.type.startsWith("image/") ? (
                  <img
                    src={preview}
                    alt={file.name}
                    className="object-cover w-full h-full"
                  />
                ) : file.type.startsWith("video/") ? (
                  <video
                    src={preview}
                    className="object-cover w-full h-full"
                    muted
                  />
                ) : (
                  <FileText className="text-gray-300" size={32} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="truncate text-white font-semibold text-sm">
                  {file.name}
                </p>
                <p className="text-xs text-gray-400">{formatSize(file.size)}</p>

                {/* Progress bar */}
                {uploading && (
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-200"
                      style={{
                        width: `${progress[file.name] || 0}%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>

              {!uploading && (
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  <XCircle size={22} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <div className="pt-3">
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`btn btn-accent px-6 ${
            uploading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
      </div>
    </div>
  );
};

export default MediaUpload;
