"use client";

import { Button, Image } from "@heroui/react";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";

import { useLocale } from "next-intl";
import { ServiceContent, SingleServiceResponse } from "../types/service";
import RichTextRenderer from "./utils/richtextRenderer";

type Props = {
  service: SingleServiceResponse["data"];
};

export default function ServiceDetails({ service }: Props) {
  const router = useRouter();
  const locale = useLocale();

  const getLocalizedContent = (item: ServiceContent | undefined) => {
    if (!item) return { title: "Loading...", description: null };

    const localizedData = item.localizations?.find((loc) => loc.locale === locale);

    return {
      title: localizedData?.title || item.title,
      description: localizedData?.description || item.description,
    };
  };

  const currentServiceContent = getLocalizedContent(service);

  return (
    <div className="min-h-screen pb-10">
      {/* Background Image */}
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

      {/* Content */}
      <div className="relative">
        <div
          style={{
            backgroundImage: "url('/images/bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative z-10"
        >
          <div className="absolute inset-0 bg-white/90 z-1" />

          <div className="relative container mx-auto px-4 sm:px-8 lg:px-16 z-10">
            <Button
              onPress={() => router.back()}
              className="flex items-center bg-transparent text-gray-900 hover:text-gray-900 transition-colors mb-8"
            >
              <BiArrowBack className="w-5 h-5 rtl:rotate-180 mr-2" />
              Back
            </Button>

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {currentServiceContent.title}
            </h1>

            {currentServiceContent.description && (
              <div className="text-gray-900 leading-relaxed mb-10 max-w-4xl">
                <RichTextRenderer content={currentServiceContent.description} />
              </div>
            )}

            {service.service_categories && service.service_categories.length > 0 && (
              <div className="space-y-8">
                {service.service_categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-6 rounded-lg shadow-sm backdrop-blur-md"
                  >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                      {category.name}
                    </h2>
                    {category.description && (
                      <div className="text-gray-700 leading-relaxed">
                        <RichTextRenderer
                          content={category.description}
                          bulletColorClass="bg-gray-700"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
