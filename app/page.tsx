import HomeComponent from "@/components/home-component";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div className="min-h-screen w-full p-6 md:p-10">
      <HomeComponent />
    </div>
  );
}
