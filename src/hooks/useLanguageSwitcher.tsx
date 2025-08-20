"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useLanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();

  const getDirection = () => {
    // store new locale in cookie
    Cookies.set("NEXT_LOCALE", locale === "ar" ? "en" : "ar");

    // if root (/) or (/ar), just toggle
    if (pathName === "/ar" || pathName === "/") {
      return locale === "en" ? "/ar" : "/en";
    }

    // otherwise, replace segment
    return locale === "en"
      ? `/ar${pathName}`
      : pathName.replace("/ar/", "/en/");
  };

  const switchLang = () => {
    router.push(getDirection());
  };

  return { locale, switchLang };
}
