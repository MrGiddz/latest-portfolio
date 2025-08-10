import CredentialsComponent from "@/components/credentials-component";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Credentials",
};

export default function CredentialsPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-10 md:pl-0">
      <CredentialsComponent />
    </div>
  );
}
