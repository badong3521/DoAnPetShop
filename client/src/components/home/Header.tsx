"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/public/img/header/logo.svg";
import { useSessionStore } from "@/stores/session";
import { SignOut } from "phosphor-react";
import { Button } from "../ui/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const pathname = usePathname();
  const [user, signOutUser] = useSessionStore((state) => [
    state.user,
    state.signOut,
  ]);

  function handleSignOut() {
    signOutUser();
  }
  return (
    <header className={`py-6 ${className} lg:w-full lg:left-0`}>
      <div className="container mx-auto flex flex-col gap-y-6 lg:flex-row h-full justify-between items-center relative">
        {/* logo */}
        <Link href="/home">
          <Image src={Logo} alt={""} width={150} />
        </Link>
        {/* nav */}
        <nav className="text-2xl flex gap-x-4 lg:gap-x-12">
          <Link
            href="/services"
            className={pathname === "/services" ? "font-semibold" : ""}
          >
            Dịch vụ
          </Link>
          <Link
            href="/pet-care"
            className={pathname === "/pet-care" ? "font-semibold" : ""}
          >
            Pet Care
          </Link>
          {/* <Link href="/about" className={pathname === "/about" ? "active" : ""}>
            Về tôi
          </Link> */}
        </nav>
        <span className="text-2xl font-bold underline text-black">
          Xin chào {user?.name}
        </span>
        <Button
          onClick={handleSignOut}
          className="btn-client flex gap-2 btn-primary-client "
        >
          <p>Đăng xuất</p>
          <SignOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
