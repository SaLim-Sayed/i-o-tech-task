// src/components/links.ts

export interface DropdownItem {
    href: string;
    label: string;
  }
  
  export interface NavLink {
    href: string;
    label: string;
    hasDropdown?: boolean;
    dropdownItems?: DropdownItem[]; // List of items for a dropdown
  }
  
  export const links: NavLink[] = [
    { href: "/about-us", label: "Aboutus" },
    {
      href: "/services",
      label: "Services",
      hasDropdown: true,
      dropdownItems: [
        { href: "/services/legal-consultation", label: "LegalConsultationServices" },
        { href: "/services/defense", label: "andDefenseinAllCases" }, // Corrected spelling based on image context
        { href: "/services/companies-institutions", label: "ServicesforCompaniesandInstitutions" },
        { href: "/services/establishing-companies", label: "EstablishingNationalandForeignCompanies" },
  
        { href: "/services/foreign-investment", label: "ForeignInvestmentServices" },
        { href: "/services/banks-financial", label: "BanksandFinancialInstitutions" },
        { href: "/services/arbitration", label: "Arbitration" },
        { href: "/services/commercial-agencies", label: "CommercialAgencies" },
  
        { href: "/services/contracts", label: "Contracts" },
        { href: "/services/corporate-governance", label: "CorporateGovernanceServices" },
        { href: "/services/intellectual-property", label: "IntellectualProperty" },
        { href: "/services/vision-2030", label: "SupportingVision2030" },
  
        { href: "/services/notarization", label: "Notarization" },
        { href: "/services/companies-liquidation", label: "CompaniesLiquidation" },
        { href: "/services/corporate-restructuring", label: "CorporateRestructuringandReorganization" },
        { href: "/services/estates", label: "Estates" },
  
        { href: "/services/insurance", label: "Insurance" },
        { href: "/services/internal-regulations", label: "InternalRegulationsforCompanies" },
      ],
    },
    { href: "/our-team", label: "OurTeam" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact-us", label: "ContactUs" },
  ];