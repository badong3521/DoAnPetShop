"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/public/img/header/logo.svg";
import { useSessionStore } from "@/stores/session";
import { Link, SignOut } from "phosphor-react";
import { Button } from "../ui/Button";
import { redirect } from "next/navigation";

const Header = () => {
  const isUserLoggedIn = useSessionStore((state) => state.isLoggedIn);
  const [user, signOutUser] = useSessionStore((state) => [
    state.user,
    state.signOut,
  ]);

  if (!isUserLoggedIn) {
    redirect("/login");
  }

  function handleSignOut() {
    signOutUser();
  }
  return (
    <header className="py-6 lg:absolute lg:w-full lg:left-0">
      <div className="container mx-auto flex flex-col gap-y-6 lg:flex-row h-full justify-between items-center relative">
        {/* logo */}
        <a href="/home">
          <Image src={Logo} alt={""} width={150} />
        </a>
        {/* nav */}
        <nav className="text-2xl flex gap-x-4 lg:gap-x-12">
          <a href="/service">Dịch vụ</a>
          <a href="#">Về tôi</a>
          {/* <a href="#">Blog</a>
          <a href="#">Liên hệ</a> */}
        </nav>
        <span className="text-2xl font-bold underline text-black">
          Xin chào {user?.name}
        </span>
        <Button
          onClick={handleSignOut}
          className="btn-client flex gap-2 btn-primary-client lg:btn-outline-client"
        >
          <p>Đăng xuất</p>
          <SignOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
