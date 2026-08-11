import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import React from "react";

export default function ContentLayout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      {children}
      <Footer />
    </div>
  );
}
