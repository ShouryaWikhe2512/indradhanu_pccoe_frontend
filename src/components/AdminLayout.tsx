import React from "react";
import AdminSidebar from "./AdminSidebar";
import Header from "./Header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sustainable/5">
      <Header />
      <div className="flex" style={{ marginTop: '64px' }}>
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

