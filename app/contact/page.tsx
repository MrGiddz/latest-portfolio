import ContactForm from "@/components/contact-form";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Contact Me",
  description:
    "Get in touch for software engineering roles, product builds, consulting, and technical collaboration.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
