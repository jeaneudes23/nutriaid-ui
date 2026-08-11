import { AppLogo } from "@/components/AppLogo";
import { HistoryIcon, TrendingUpIcon, Users2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function layout({ children }: LayoutProps<"/">) {
  const FEATURES = [
    {
      icon: <Users2Icon />,
      title: "Manage Multiple Profiles",
      summary: "Keep individual records organized and easily accessible for each child.",
    },
    {
      icon: <HistoryIcon />,
      title: "Save historical data",
      summary: "Maintain a secure, long-term log of growth, meals,and vital metrics.",
    },
    {
      icon: <TrendingUpIcon />,
      title: "Get personalized trends",
      summary: "Visualize progress over time with clear, clinical-grade charts.",
    },
  ];
  return (
    <div className="grid lg:h-dvh lg:grid-cols-2">
      <div className="bg-primary/10 px-4 py-12 lg:px-12">
        <Link href={"/"}>
          <AppLogo />
        </Link>
        <div className="mt-12 mb-8 space-y-2">
          <h1 className="font-heading text-4xl font-bold">Empowering caregivers</h1>
          <p className="text-gray-600">Create an account to securely manage health data and gain actionable insights for the children in your care.</p>
        </div>
        <div className="grid gap-4">
          {FEATURES.map((feature, i) => (
            <div key={i} className="bg-background flex items-start gap-4 rounded p-4 shadow">
              <span className="text-primary">{feature.icon}</span>
              <div>
                <h3 className="font-heading font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-y-auto px-4 py-12 lg:px-12">{children}</div>
    </div>
  );
}
