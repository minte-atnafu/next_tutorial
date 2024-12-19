"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Page() {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [gifUrl, setGifUrl] = useState(null); // To store the generated GIF URL
  const [loading, setLoading] = useState(false); // For showing loading state

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB.");
      return;
    }
    setError("");
    setVideo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      setError("Please upload a video first.");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("body", body);

    setLoading(true);

    try {
      const response = await fetch("/api/convert-to-gif", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to convert the video.");
      }

      const data = await response.json();
      setGifUrl(data.gifUrl);
      setLoading(false);
    } catch (err) {
      setError("Error while converting video.");
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/x-matroska': ['.mkv'],
    }, // Update this as per the formats you want to support
  });
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Upload Video to Convert to GIF</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div
        {...getRootProps()}
        className="p-4 border-dashed border-2 border-gray-400 rounded cursor-pointer mb-4"
      >
        <input {...getInputProps()} />
        {video ? (
          <p className="text-center">Selected: {video.name}</p>
        ) : (
          <p className="text-center text-gray-600">Drag & drop a video file here or click to select</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter video title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="Enter video description"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Converting..." : "Convert to GIF"}
      </button>

      {gifUrl && (
        <div className="mt-4">
          <h2 className="font-bold mb-2">Generated GIF</h2>
          <img src={gifUrl} alt="Generated GIF" className="border rounded" />
          <a href={gifUrl} download="converted.gif" className="block mt-2 text-blue-500">
            Download GIF
          </a>
        </div>
      )}
    </div>
  );
}
