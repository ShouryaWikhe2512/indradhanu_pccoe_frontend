import React from "react";
import CitizenSidebar from "./CitizenSidebar";
import Header from "./Header";

interface CitizenLayoutProps {
  children: React.ReactNode;
}

export default function CitizenLayout({ children }: CitizenLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sustainable/5">
      <Header />
      <div className="flex" style={{ marginTop: "64px" }}>
        <CitizenSidebar />
        <main className="flex-1 ml-64 p-8 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

