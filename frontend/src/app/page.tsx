"use client";

import * as React from "react";

import AppLayout from "@/components/layouts/AppLayout";
import WelcomeData from "@/components/main/WelcomeData";
import AboutUsData from "@/components/main/AboutUsData";
import SupportData from "@/components/main/SupportData";
import FooterData from "@/components/footer/FooterData";

export default function Home() {
  const aboutUsRef = React.useRef<HTMLDivElement>(null);
  const supportRef = React.useRef<HTMLDivElement>(null);

  const handleAboutClick = () => {
    aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSupportClick = () => {
    supportRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppLayout
      onAboutClick={handleAboutClick}
      onSupportClick={handleSupportClick}
    >
      <WelcomeData />

      <div ref={aboutUsRef}>
        <AboutUsData />
      </div>

      <div ref={supportRef}>
        <SupportData />
      </div>

      <FooterData />
    </AppLayout>
  );
}
