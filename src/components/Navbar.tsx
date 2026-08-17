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
      <div className="container flex items-center justify-between py-4">
        <Link href={"/"}>
          <AppLogo />
        </Link>

        <NavUserMenu />
      </div>
    </nav>
  );
};
