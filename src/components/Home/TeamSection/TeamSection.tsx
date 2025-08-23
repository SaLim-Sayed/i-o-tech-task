"use client";

import { useApiQuery } from "@/src/hooks/useApiQuery"; // Assuming this hook is available
import { Button, Image } from "@heroui/react"; // Assuming @heroui/react provides an Image component
import { FaWhatsapp } from "react-icons/fa"; // For WhatsApp icon
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdEmail, MdPhone } from "react-icons/md"; // For phone and email icons
import "swiper/css";
import "swiper/css/navigation"; // Import for navigation styles
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    ProcessedTeamMember,
    TeamMemberContent,
    TeamMembersResponse,
} from "../@types/team"; // Adjust path as necessary

 const getTeamMemberPhotoUrl = (
    photo: TeamMemberContent["photo"] | undefined
): string => {
     if (photo?.formats?.small?.url) {
        return `${photo.formats.small.url}`;
    }
    if (photo?.url) {
        return `${photo.url}`;
    }
    return "/images/person-placeholder.jpg";
};

 const formatApiTeamMembers = (
    data: TeamMemberContent[]
): ProcessedTeamMember[] => {
    return data.map((item: TeamMemberContent) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        imageSrc: getTeamMemberPhotoUrl(item.photo),
    }));
};

 const TEAM_SWIPER_CONFIG = {
    modules: [Navigation, A11y],
    spaceBetween: 30,
    navigation: {
        nextEl: ".team-swiper-button-next",
        prevEl: ".team-swiper-button-prev",
    },
    loop: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    speed: 800, // Transition speed
};

const TeamSection = () => {
    const { data, isLoading, error } = useApiQuery<TeamMembersResponse>({
        key: ["team-members"],
        endpoint: "team-members",
    });

     const teamMembers = data?.data ? formatApiTeamMembers(data.data) : [];

    if (isLoading) {
        return (
            <section className="bg-gray-100 py-20 flex items-center justify-center min-h-[500px]">
                <div className="text-gray-800 text-xl">Loading team members...</div>
            </section>
        );
    }

    if (error) {
        console.error("Error loading team members:", error);
        return (
            <section className="bg-gray-100 py-20 flex items-center justify-center min-h-[500px]">
                <div className="text-red-600 text-xl">
                    Failed to load team members. Please try again later.
                </div>
            </section>
        );
    }

    return (
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center">
                 <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
                <p className="text-gray-600 max-w-3xl mx-auto mb-12">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text
                    ever since the 1500s
                </p>

                {/* Swiper Slider for Team Members */}
                <div className="relative">
                    <Swiper {...TEAM_SWIPER_CONFIG} className="w-full">
                        {teamMembers.map((member) => (
                            <SwiperSlide key={member.id}>
                                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                                    {/* Team Member Photo */}
                                    <div className="w-40 h-40 rounded-lg overflow-hidden mb-4">
                                        <Image
                                            src={member.imageSrc}
                                            alt={member.name}
                                            width="100%"
                                            height="100%"
                                            radius="lg" // Rounded corners for the image itself
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Team Member Name and Role */}
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4">
                                        {member.role}
                                    </p>
                                    {/* Contact Icons (placeholders) */}
                                    <div className="flex space-x-4 text-gray-600">
                                        <FaWhatsapp className="w-5 h-5 cursor-pointer hover:text-green-500 transition-colors" />
                                        <MdPhone className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
                                        <MdEmail className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Arrows for Swiper */}
                    <Button isIconOnly className="team-swiper-button-prev absolute top-1/2 -translate-y-1/2 left-1 sm:-left-20 z-10 p-3 rounded-full bg-white shadow-lg cursor-pointer hover:bg-gray-50 transition-colors text-gray-700   sm:block">
                        <IoIosArrowBack />
                    </Button>
                    <Button isIconOnly className="team-swiper-button-next absolute top-1/2 -translate-y-1/2 right-1 sm:-right-20 z-10 p-3 rounded-full bg-white shadow-lg cursor-pointer hover:bg-gray-50 transition-colors text-gray-700   sm:block">
                        <IoIosArrowForward
                        />

                    </Button>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;