import HomeComponent from "@/components/home-component";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return <HomeComponent />;
}
