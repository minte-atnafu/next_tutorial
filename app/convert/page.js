"use client";

import { useSearchParams } from "next/navigation";

export default function ConvertResult() {
  const searchParams = useSearchParams();
  const gifUrl = searchParams.get("gifUrl");
  const title = searchParams.get("title");
  const body = searchParams.get("body");

  if (!gifUrl) {
    return <div className="text-red-500">No GIF data found. Please try again.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">GIF Conversion Result</h1>

      <h2 className="font-bold mb-2">Title</h2>
      <p className="mb-4">{title}</p>

      <h2 className="font-bold mb-2">Description</h2>
      <p className="mb-4">{body}</p>

      <h2 className="font-bold mb-2">Generated GIF</h2>
      <img src={gifUrl} alt="Generated GIF" className="border rounded mb-4" />
      <a href={gifUrl} download="converted.gif" className="block text-blue-500">
        Download GIF
      </a>
    </div>
  );
}
