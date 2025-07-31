import { Metadata } from "next";
import React from "react";

// --- Data for Certifications ---
const certificationsData = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services - 2023",
  },
  {
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud - 2022",
  },
  {
    title: "MongoDB Certified Developer",
    issuer: "MongoDB University - 2021",
  },
];

export const metadata: Metadata = {
  title: "My Credentials",
};

// --- Sub-component for the main content ---
const CredentialsContent = () => (
  <div className="space-y-8">
    {/* Education Section */}
    <div>
      <h3 className="text-white font-semibold text-lg">
        BSc. Computer Science
      </h3>
      <p className="text-blue-300">
        Osun State University, Osun State, Nigeria
      </p>
      <p className="text-gray-400 text-sm font-mono">2015 - 2019</p>
    </div>

    {/* Certifications Section */}
    <div>
      <h3 className="text-white font-semibold text-lg mb-4">Certifications</h3>
      <div className="space-y-4">
        {certificationsData.map((cert, index) => (
          <div key={index}>
            <p className="text-blue-300">{cert.title}</p>
            <p className="text-gray-400 text-sm">{cert.issuer}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Main Page Component ---
export default function CredentialsPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center font-mono">
          Credentials
        </h2>
        <CredentialsContent />
      </div>
    </div>
  );
}