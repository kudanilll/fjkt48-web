"use client";
import { useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const imagesData = [
  {
    image: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/theater/theater-1.png`,
    desc: "Gerbang Depan Theater",
  },
  {
    image: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/theater/theater-2.png`,
    desc: "Kabesha",
  },
  {
    image: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/theater/theater-3.png`,
    desc: "Poster",
  },
];

function TheaterSliderDesktop() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
  const goToPrevSlide = () =>
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imagesData.length) % imagesData.length
    );
  const handleThumbnailClick = (index: number) => setCurrentIndex(index);

  return (
    <div className="relative flex">
      <div className="relative w-full h-[72vh]">
        <Image
          key={currentIndex}
          src={imagesData[currentIndex].image}
          alt={`Main Image ${currentIndex + 1}`}
          width={0}
          height={0}
          className="transition-transform duration-500 ease-in-out rounded-lg w-full h-full overflow-hidden object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background:
              "radial-gradient(circle, transparent 50%, rgba(0,0,0,0.9) 100%)",
          }}></div>
      </div>

      <div className="absolute bottom-0 left-0 flex flex-col items-start gap-1 p-4">
        <h1 className="font-semibold text-5xl font-poppins text-neutral-200">
          {imagesData[currentIndex].desc}
        </h1>
        <p className="font-poppins text-neutral-300">
          Z Creators/Azzahra Nur Vitria
        </p>
      </div>

      <div className="absolute top-0 right-0 flex flex-col items-end gap-2 p-4">
        <div className="flex flex-row gap-2">
          {imagesData.map((data, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`cursor-pointer transition-opacity duration-300 ${
                index === currentIndex
                  ? "opacity-100 border-2 border-red-500 rounded"
                  : "opacity-60"
              }`}>
              <Image
                src={data.image}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="rounded"
              />
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={goToPrevSlide}
            className="bg-red-500 text-white p-2 rounded-full transition-colors duration-300 hover:bg-red-800">
            <MdArrowBack size={24} />
          </button>
          <button
            onClick={goToNextSlide}
            className="bg-red-500 text-white p-2 rounded-full transition-colors duration-300 hover:bg-red-800">
            <MdArrowForward size={24} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 p-4">
        <Link
          href="https://maps.app.goo.gl/BFVqGgjGda9sW5fN8"
          target="_blank"
          className="flex flex-row gap-2 items-center">
          <p className="font-semibold text-xl font-poppins text-neutral-200">
            Temukan di <br />
            Google Maps
          </p>
          <Image
            src="/assets/google-maps-icon.png"
            alt="Google Maps"
            width={60}
            height={60}
          />
        </Link>
      </div>
    </div>
  );
}

function TheaterSliderMobile() {}

export default function TheaterSlider() {
  return (
    <div>
      <div className="hidden md:block">
        <TheaterSliderDesktop />
      </div>
    </div>
  );
}
