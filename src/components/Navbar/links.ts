// src/components/links.ts

export interface DropdownItem {
  href: string;
  label: string;
}

export interface NavLink {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

export const links: NavLink[] = [
  { href: "/about-us", label: "Aboutus" },
  {
    href: "/services",
    label: "Services",
    hasDropdown: true,
    // dropdownItems will be dynamically loaded for this link
  },
  { href: "/our-team", label: "OurTeam" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact-us", label: "ContactUs" },
];