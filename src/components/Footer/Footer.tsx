"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import SubscribeForm from "./SubscribeForm";
 
export default function Footer() {
  const t = useTranslations("Globals.footer");
  const currentYear = new Date().getFullYear();

  const footerNavLinks = [
    { href: "/about", label: t("about") },
    { href: "/our-strategy", label: t("ourStrategy") },
    { href: "/our-advantages", label: t("ourAdvantages") },
    { href: "/social-responsibility", label: t("socialResponsibility") },
    { href: "/services", label: t("ourServices") },
  ];

  return (
    <footer className="bg-[#6D3E2C] text-white py-12">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-600 pb-8 mb-8">
          <h3 className="text-xl font-semibold mb-4 md:mb-0 text-center md:text-left">
            {t("heading")}
          </h3>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <SubscribeForm />

            <SocialIcons t={t} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-300">
          <nav className="flex flex-wrap justify-center md:justify-start space-x-4 sm:space-x-6 mb-4 md:mb-0">
            {footerNavLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-center md:text-right">
            {t("copyright", { year: currentYear })}
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialIcons = ({ t }: { t: any }) => (
  <div className="flex items-center space-x-4 gap-4">
     <div className="flex space-x-3 text-2xl">
      <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-gray-400 transition-colors">
        <FaTwitter />
      </Link>
      <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-400 transition-colors">
        <FaFacebookF />
      </Link>
      <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-gray-400 transition-colors">
        <FaLinkedinIn />
      </Link>
      <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-400 transition-colors">
        <FaInstagram />
      </Link>
    </div>
  </div>
);
