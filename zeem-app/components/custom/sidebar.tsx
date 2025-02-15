"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, UserPlus, Upload, FileSpreadsheet } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";

const navItems = [
  { name: "Students", href: "/", icon: Users },
  { name: "Add Student", href: "/add-student", icon: UserPlus },
  { name: "Bulk Upload", href: "/bulk-upload", icon: Upload },
  { name: "Applications", href: "/applications", icon: FileSpreadsheet },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen } = useSidebar();

  return (
    <aside
      className={`bg-gray-800 text-white w-64 min-h-screen p-4 transition-all duration-300 ease-in-out fixed md:relative z-20 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <nav className="space-y-2 my-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
              pathname === item.href ? "bg-gray-700" : ""
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
