"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { Image } from "@heroui/react";

export default function ServiceNotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-20 px-4">
      <div className="relative">
        <Image
          src="/images/slides/slide1.jpg"
          alt="Background"
          radius="none"
          className="w-full h-[800px] object-cover"
          removeWrapper
        />
        <div className="absolute inset-0 bg-orange-950/60 z-10" />
      </div>
      <div className="text-xl text-gray-700 text-center mb-4">
        Service not found or inaccessible.
      </div>
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-600 hover:underline transition-colors"
      >
        <BiArrowBack className="w-5 h-5 rtl:rotate-180 mr-2" />
        Go back
      </button>
    </div>
  );
}
