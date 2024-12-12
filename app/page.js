import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        src="/awuraLogo.png"
        width={200}
        height={200}
        alt="the company logo"
        className="mx-auto"
      />
      <div className=" head_text text-5xl font-bold mx-auto text-center">Awura</div>
      <div className="orange_gradient text-3xl mt-2 text-center font-bold ">GifMaker</div>
      <p className="text-center font-bold mt-3 text-sky-600/100">GifMaker: Easily convert your videos into GIFs. Upload a video (≤ 2MB), add a title and description, and share a unique link to your GIF</p>
      <div className="flex justify-center items-center mt-3">
           <button className="bg-blue-500 text-white px-4 py-2 rounded">Upload Your video Here</button>
      </div>
    </div>
  )
}


