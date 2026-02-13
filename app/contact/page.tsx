import ContactForm from "@/components/contact-form";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Contact Me",
  description:
    "Get in touch for SaaS application development, end-to-end software delivery, consulting, and team-based project execution.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
