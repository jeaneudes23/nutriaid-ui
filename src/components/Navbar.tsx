import Link from "next/link";
import { AppLogo } from "./AppLogo";
import { NavUserMenu } from "./NavUserMenu";

const NAV_LINKS = [
  {
    label: "Profiles",
    href: "/",
  },
  {
    label: "Recommendations",
    href: "/",
  },
  {
    label: "Monitoring",
    href: "/",
  },
];
export const Navbar = () => {
  return (
    <nav className="bg-primary/5 border-b">
      <div className="container flex items-center justify-between py-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link href={"/"}>
          <AppLogo />
        </Link>
        <ul className="hidden items-center gap-4 lg:flex lg:min-w-md lg:justify-center">
          {NAV_LINKS.map((nav_link, index) => (
            <Link className="p-1 font-medium text-gray-600 hover:underline" key={index} href={nav_link.href}>
              {nav_link.label}
            </Link>
          ))}
        </ul>
        <NavUserMenu />
      </div>
    </nav>
  );
};
