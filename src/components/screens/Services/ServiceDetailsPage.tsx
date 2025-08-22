// src/app/[locale]/services/[id]/page.tsx
"use client";

import { useApiQuery } from "@/src/hooks/useApiQuery"; // Assuming this hook exists
import { SingleServiceResponse, ServiceContent } from "../types/service"; // Adjust path as needed
import { useLocale } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import { BiArrowBack } from "react-icons/bi"; // Back icon from react-icons
import RichTextRenderer from "./utils/richtextRenderer";
import SlideBackground from "../../Home/Hero/components/SlideBackground";
import { Button, Image } from "@heroui/react";

export default function ServiceDetailsPage() {
    const router = useRouter();
    const params = useParams(); // Hook to get route parameters (e.g., { id: '...' })
    const locale = useLocale(); // Hook to get the current locale from next-intl
    const serviceId = params.id as string; // Extract service ID from URL, cast to string

    // Fetch a single service by ID
    // The 'populate=service_categories' ensures that nested service categories are included.
    // We include 'locale' in the key to ensure data refreshes when the locale changes.
    const { data, isLoading, error } = useApiQuery<SingleServiceResponse>({
        key: ["service", serviceId, locale], // Key includes locale for re-fetching on language change
        endpoint: `services/${serviceId}`, // Ensure localizations are populated
        enabled: !!serviceId, // Only execute query if serviceId is available
    });

    const service = data?.data; // Extract the service content from the response

    // Helper function to get the localized title and description
    const getLocalizedContent = (item: ServiceContent | undefined) => {
        if (!item) return { title: "Loading...", description: null };

        // Find the localization for the current locale
        const localizedData = item.localizations?.find(loc => loc.locale === locale);

        return {
            title: localizedData?.title || item.title, // Use localized title, fallback to default item title
            description: localizedData?.description || item.description, // Use localized description, fallback to default item description
        };
    };

    const currentServiceContent = getLocalizedContent(service);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 py-20">
                <div className="text-xl text-gray-700">Loading service details...</div>
            </div>
        );
    }

    if (error) {
        console.error("Error loading service details:", error);
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

    // If serviceId is provided but no data is returned (e.g., 404)
    if (!service) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-20 px-4">

                <div className="relative  ">
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

    return (
        <div className="  min-h-screen pb-10">
            <div className="relative  ">
                <Image
                    src="/images/slides/slide1.jpg"
                    alt="Background"
                    radius="none"
                    className="w-full h-[800px] object-cover"
                    removeWrapper
                />

                <div className="absolute inset-0 bg-orange-950/60 z-10" />
            </div>
            <div className="relative">
                {/* Background with bg.png */}
                <div
                    style={{
                        backgroundImage: "url('/images/bg.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    className="relative z-10"
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-white/90 z-1" />

                    {/* Content */}
                    <div className="relative  container  mx-auto  px-4 sm:px-8 lg:px-16 z-10">
                        <Button
                            onPress={() => router.back()}
                            className="flex items-center text-gray-200 hover:text-white transition-colors mb-8"
                            aria-label="Go back to previous page"
                        >
                            <BiArrowBack className="w-5 h-5 rtl:rotate-180 mr-2" />
                            Back
                        </Button>

                        <h1 className="text-4xl font-bold text-white mb-6">
                            {currentServiceContent.title}
                        </h1>

                        {currentServiceContent.description && (
                            <div className="text-gray-100 leading-relaxed mb-10 max-w-4xl">
                                <RichTextRenderer content={currentServiceContent.description} />
                            </div>
                        )}

                        {service.service_categories && service.service_categories.length > 0 && (
                            <div className="space-y-8">
                                {service.service_categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="  p-6 rounded-lg shadow-sm backdrop-blur-md"
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