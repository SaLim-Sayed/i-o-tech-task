// src/components/Navbar.tsx
"use client";

import Logo from "@/public/images/image.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo } from "react"; // Import useMemo
import { BiMenu, BiX, BiChevronDown } from "react-icons/bi";
import DrawerMenu from "./DrawerMenu";
import { links, NavLink, DropdownItem } from "./links"; // Import DropdownItem for type
import { useLocale, useTranslations } from "next-intl";
import Cookies from "js-cookie";
import {
  Button,
  Dropdown,
  DropdownItem as HeroUIDropdownItem, // Rename to avoid conflict with custom DropdownItem
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";

// Import types for services
 import { useApiQuery } from "@/src/hooks/useApiQuery";
import { ServiceContent, ServicesResponse } from "../screens/types/service";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesPopoverOpen, setIsServicesPopoverOpen] = useState(false);

  const router = useRouter();
  const locale = useLocale();
  const pathName = usePathname();
  const t = useTranslations("Globals");

  const normalizedPath = pathName.startsWith(`/${locale}`)
    ? pathName.replace(`/${locale}`, "")
    : pathName;

  const handleLanguageChange = (selectedLocale: any) => {
    Cookies.set("NEXT_LOCALE", selectedLocale, { expires: 365 });

    let newPath;
    if (selectedLocale === "en") {
      newPath = normalizedPath === "" ? "/" : normalizedPath;
    } else {
      newPath = `/ar${normalizedPath === "" ? "/" : normalizedPath}`;
    }
    router.push(newPath);
  };

  const languageOptions = [
    { key: "en", label: "English" },
    { key: "ar", label: "العربية" },
  ];

  // Fetch services data for the mega-menu
  const {
    data: servicesData,
    isLoading: isServicesLoading,
    error: servicesError,
  } = useApiQuery<ServicesResponse>({
    key: ["navbar-services", locale], // Key with locale for re-fetching on language change
    endpoint: "services", // Populate localizations for titles

  });

  // Memoize the processed services for the dropdown
  const servicesDropdownItems: DropdownItem[] = useMemo(() => {
    if (isServicesLoading || servicesError || !servicesData?.data) {
      return []; // Return empty array during loading or error
    }

    return servicesData.data.map((service: ServiceContent) => {
       const localizedTitle =
        service.localizations?.find((loc) => loc.locale === locale)?.title ||
        service.title;

      return {
        href: `/services/${service.documentId}`,  
        label: localizedTitle || "Untitled Service",
      };
    });
  }, [servicesData, isServicesLoading, servicesError, locale]);

  return (
    <div>
      <nav className="z-50 fixed left-0 right-0 top-0 mx-auto bg-[#492213f4] w-full py-4 shadow-md text-white">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href={locale === "en" ? "/" : "/ar"}>
            <Image src={Logo} alt="Logo" width={100} height={40} />
          </Link>

           <div className="hidden md:flex items-center space-x-8 text-white text-base">
            {links.map((link: NavLink) =>
              link.hasDropdown ? (
                 <Popover
                  key={link.label}
                  showArrow={false}
                  offset={20}
                  placement="bottom-start"
                  isOpen={isServicesPopoverOpen}
                  onOpenChange={setIsServicesPopoverOpen}
                >
                  <PopoverTrigger>
                    <Button
                      variant="light"
                      className="p-0 bg-transparent text-white font-normal hover:opacity-80 data-[hover=true]:bg-transparent"
                      endContent={
                        <BiChevronDown
                          className={`text-xl transition-transform ${
                            isServicesPopoverOpen ? "rotate-180" : ""
                          }`}
                        />
                      }
                    >
                      {t(link.label)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-[#492213f4] shadow-lg rounded-md w-full min-w-[950px] whitespace-nowrap overflow-hidden transform-gpu z-40 p-8">
                    {isServicesLoading && (
                      <div className="text-white text-center">
                        Loading services...
                      </div>
                    )}
                    {servicesError && (
                      <div className="text-red-300 text-center">
                        Failed to load services.
                      </div>
                    )}
                    {!isServicesLoading && !servicesError && servicesDropdownItems.length === 0 && (
                        <div className="text-white text-center">No services available.</div>
                    )}
                    {!isServicesLoading && !servicesError && servicesDropdownItems.length > 0 && (
                      <div className="grid grid-cols-5 gap-x-8 gap-y-4">
                        {(() => {
                          const numColumns = 5;
                          const itemsPerColumn = Math.ceil(
                            servicesDropdownItems.length / numColumns
                          );
                          const columns = Array.from(
                            { length: numColumns },
                            (_, colIndex) => {
                              const start = colIndex * itemsPerColumn;
                              const end = start + itemsPerColumn;
                              return servicesDropdownItems.slice(start, end);
                            }
                          );

                          return columns.map((columnItems, colIndex) => (
                            <div
                              key={colIndex}
                              className="flex flex-col space-y-2"
                            >
                              {columnItems.map((item) => (
                                <Link
                                  key={item.href} 
                                  href={
                                    locale === "en"
                                      ? item.href
                                      : `/${locale}${item.href}`
                                  }
                                  className="block text-white hover:text-gray-300 transition-colors text-sm"
                                  onClick={() => setIsServicesPopoverOpen(false)}
                                >
                                  {item.label} 
                                </Link>
                              ))}
                            </div>
                          ));
                        })()}
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              ) : (
                <Link
                  key={link.label}
                  href={locale === "en" ? link.href : `/${locale}${link.href}`}
                  className="transition hover:opacity-80"
                >
                  {t(link.label)}
                </Link>
              )
            )}
          </div>

           <div className="flex items-center gap-4 space-x-4">
             <Dropdown
              classNames={{
                content: "bg-[#492213f4] text-white",
              }}
            >
              <DropdownTrigger>
                <Button
                  className="flex items-center justify-center gap-1 bg-transparent min-w-unit-0 text-white border-white/20 px-4 py-2"
                  variant="bordered"
                  aria-label="Select Language"
                >
                  <span className="text-white text-sm">
                    {locale === "ar" ? "AR" : "EN"}
                  </span>
                  <BiChevronDown className={`text-xl transition-transform`} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Language Selection"
                items={languageOptions}
                onAction={(key) => handleLanguageChange(key)}
                selectedKeys={[locale]}
                selectionMode="single"
                classNames={{
                  base: "bg-[#492213f4] text-white",
                  list: "bg-[#492213f4] text-white",
                }}
                className="bg-[#492213f4] text-white"
              >
                {(item) => (
                  <HeroUIDropdownItem // Use aliased DropdownItem from @heroui/react
                    key={item.key}
                    className={`flex items-center gap-2 text-white data-[hover=true]:bg-white/10 ${
                      item.key === locale ? "bg-white/20" : ""
                    }`}
                  >
                    <span>{item.label}</span>
                  </HeroUIDropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

            {/* Book Appointment Button */}
            <Button
              as={Link}
              href="/book-appointment"
              variant="bordered"
              className="hidden md:flex text-white border-white hover:bg-white hover:text-[#6D3E2C] transition-colors"
            >
              {t("bookAppointment")}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              className="flex items-center justify-center border-white/20 md:hidden text-white"
              isIconOnly
              variant="bordered"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <BiX className="text-xl" />
              ) : (
                <BiMenu className="text-xl" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      <DrawerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}