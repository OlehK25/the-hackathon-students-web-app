"use client";

import * as React from "react";

import Navigation from "@/components/Navigation";

function AppLayout({
  children,
  onAboutClick,
  onSupportClick,
}: {
  children: React.ReactNode;
  onAboutClick: () => void;
  onSupportClick: () => void;
}) {
  return (
    <div className="text-black min-h-screen 2xl:flex 2xl:flex-col 2xl:items-center bg-[#EDEFF5]">
      <Navigation onAboutClick={onAboutClick} onSupportClick={onSupportClick} />

      <div className="w-full 2xl:max-w-screen-2xl">{children}</div>
    </div>
  );
}

export default AppLayout;
