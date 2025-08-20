"use client";

import Logo from "@/public/images/image.png";
import { Button, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BiMenu, BiWorld, BiX } from "react-icons/bi";
import DrawerMenu from "./DrawerMenu";
import { links } from "./links";
import SearchAutocomplete from "./SearchAutocomplete";
import { useLocale, useTranslations } from "next-intl";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const locale = useLocale();
  const pathName = usePathname();
  const t = useTranslations("Globals");

  // Get the path without locale prefix
  const normalizedPath = pathName.startsWith(`/${locale}`)
    ? pathName.replace(`/${locale}`, "")
    : pathName;

  // Function to handle language switching
  const handleLanguageChange = (selectedLocale:any) => {
    // Set the new locale in cookies
    Cookies.set("NEXT_LOCALE", selectedLocale, { expires: 365 });
    
    // Construct the new path
    let newPath;
    
    if (normalizedPath === "" || normalizedPath === "/") {
      // If we're on the home page
      newPath = selectedLocale === "en" ? "/" : "/ar";
    } else {
      // For other pages, add the locale prefix if it's Arabic
      newPath = selectedLocale === "en" ? normalizedPath : `/ar${normalizedPath}`;
    }
    
    // Navigate to the new path
    router.push(newPath);
  };

  // Language options for dropdown
  const languageOptions = [
    {
      key: "en",
      label: "English",
      flag: "🇺🇸"
    },
    {
      key: "ar",
      label: "العربية",
      flag: "🇸🇦"
    }
  ];

  return (
    <div>
      <nav className="z-[50] fixed left-0 right-0 top-0 mx-auto w-[100%] py-2 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href={locale === "en" ? "/" : "/ar"}>
            <Image src={Logo} alt="Logo" width={100} height={40} />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden space-x-6 text-white md:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={locale === "en" ? link.href : `/ar${link.href}`}
                className="transition hover:text-orange-300 hover:underline"
              >
                {t(link.label) || link.label}
              </Link>
            ))}
          </div>

          {/* Search Component */}
          <div className="hidden items-center justify-center sm:flex">
            <SearchAutocomplete setIsMenuOpen={setIsMenuOpen} />
          </div>

          {/* Language Switcher and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Language Dropdown */}
            <Dropdown classNames={{
              base: "w-[100px]",
               content: "w-[50px]",
            }}>
              <DropdownTrigger>
                <Button
                  className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 min-w-unit-0"
                  variant="flat"
                  aria-label="Select Language"
                >
                  <BiWorld className="text-xl text-white" />
                  <span className="text-white text-sm hidden sm:inline">
                    {locale === "ar" ? "AR" : "EN"}
                  </span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Language Selection"
                items={languageOptions}
                onAction={(key) => handleLanguageChange(key)}
                selectedKeys={[locale]}
                selectionMode="single"
                className="w-[100px]"
                classNames={{
                  base: "bg-[#4B2615] w-[100px]",
                  list: "w-[100px]",
                 }}
              >
                {(item) => (
                  <DropdownItem
                    key={item.key}
                    className={`flex items-center gap-2 ${item.key === locale ? "bg-primary/10" : ""}`}
                  >
                    <span>{item.flag}</span>
                    <span>{item.label}</span>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

            {/* Mobile Menu Toggle */}
            <Button
              className="flex items-center justify-center border-white/20 md:hidden"
              isIconOnly
              variant="bordered"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <BiX className="text-xl text-white" />
              ) : (
                <BiMenu className="text-xl text-white" />
              )}
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Drawer Menu */}
      <DrawerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  );
}