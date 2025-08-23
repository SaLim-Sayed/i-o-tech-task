"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

export default function ServiceError() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-20 px-4">
      <div className="text-xl text-red-600 text-center mb-4">
        Failed to load service details.
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
