import React from "react";
import { AppLogo } from "./AppLogo";
import Link from "next/link";

const FOOTER_LINKS = [
  {
    label: "Privacy Policy",
    href: "#",
  },
  {
    label: "Terms of Service",
    href: "#",
  },
  {
    label: "Medical Disclaimer",
    href: "#",
  },
  {
    label: "Contact Support",
    href: "#",
  },
];
export const Footer = () => {
  return (
    <footer className="bg-primary/10 py-8 lg:py-12">
      <div className="container flex flex-wrap items-center justify-between gap-6">
        <div className="grid max-w-md gap-4">
          <AppLogo />
          <p className="border-primary bg-background rounded border-l-4 p-4 text-sm text-gray-600 shadow">
            © 2024 PediatricCare. For informational purposes only. Always consult a healthcare professional.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {FOOTER_LINKS.map((link, i) => (
            <Link className="text-sm font-medium hover:underline" key={i} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
