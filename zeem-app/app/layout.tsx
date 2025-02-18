import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/custom/sidebar";
import Topbar from "@/components/custom/topbar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import ReduxProvider from "./redux-provider";
import { ToasterProvider } from "./toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Management Interface",
  description: "Manage students, applications, and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ReduxProvider>
          <SidebarProvider>
            <div className="flex flex-col h-screen bg-gray-100">
              <Topbar />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ReduxProvider>

        <ToasterProvider />
      </body>
    </html>
  );
}
