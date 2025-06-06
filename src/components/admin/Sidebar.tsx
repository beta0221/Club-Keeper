"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Settings, LayoutDashboard, Calendar } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: "儀表板",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "會員管理",
      href: "/admin/users",
      icon: Users,
    },
    {
        name: "Appointments",
        href: "/admin/appointments",
        icon: Calendar,
      },
    {
      name: "設定",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="h-16 flex items-center justify-center border-b">
        <h1 className="text-xl font-bold text-gray-800">CLUB KEEPER</h1>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                isActive ? "bg-gray-100 border-r-4 border-blue-500" : ""
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 