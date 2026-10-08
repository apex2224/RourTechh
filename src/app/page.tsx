import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "RourTech — Digital Solutions That Drive Business Growth",
  description:
    "RourTech builds fast, scalable and SEO-friendly websites, web applications and digital solutions that help businesses grow online.",
};

export default function HomePage() {
  return <HomeClient />;
}
