"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Bag, Calendar, Info, Person } from "phosphor-react";
import { SignedInHeader } from "@/components/dashboard/SignedInHeader";
import { useSessionStore } from "src/stores/session";
import { Header } from "@/components/Header";
import { FancyLoading } from "@/components/ui/Loading/FancyLoading";

const ROUTES = [
  {
    name: "Cuộc hẹn",
    link: "/dashboard/appointments",
    Icon: () => <Calendar size={24} />,
  },
  {
    name: "Khách hàng",
    link: "/dashboard/customers",
    Icon: () => <Person size={24} />,
  },
  {
    name: "Dịch vụ",
    link: "/dashboard/services",
    Icon: () => <Bag size={24} />,
  },
  {
    name: "Về tôi",
    link: "/dashboard/about",
    Icon: () => <Info size={24} />,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const isUserLoggedIn = useSessionStore((state) => state.isLoggedIn);
  const [user] = useSessionStore((state) => [state.user, state.signOut]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center">
          <FancyLoading />
        </div>
      </div>
    );
  }

  if (!isUserLoggedIn || user?.name !== "ADMIN") {
    redirect("/login");
  }
  return (
    <div className="text-white">
      <SignedInHeader />

      <div className="min-h-screen drawer drawer-mobile block lg:drawer-open lg:grid">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex">
          <main className="w-full p-4">{children}</main>
        </div>

        <div className="drawer-side border-r-2 z-10">
          <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-60 h-full bg-base-100 text-base-content gap-2">
            <Link href="/" className="btn btn-link prose block lg:hidden">
              <h1>Petshop</h1>
            </Link>

            {ROUTES.map((route) => (
              <li className="text-white" key={route.name}>
                <Link
                  href={route.link}
                  className={pathname?.includes(route.link) ? "active" : ""}
                >
                  <route.Icon />
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
