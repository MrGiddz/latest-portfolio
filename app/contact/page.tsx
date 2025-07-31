import ContactForm from "@/components/contact-form";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Contact Me",
};

export default function ContactPage() {
  return <ContactForm />;
}