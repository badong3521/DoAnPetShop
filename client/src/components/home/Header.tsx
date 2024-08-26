import React from "react";
import Image from "next/image";
import Logo from "@/public/img/header/logo.svg";

const Header = () => {
  return (
    <header className="py-6 lg:absolute lg:w-full lg:left-0">
      <div className="container mx-auto flex flex-col gap-y-6 lg:flex-row h-full justify-between items-center relative">
        {/* logo */}
        <a href="#">
          <Image src={Logo} alt={""} />
        </a>
        {/* nav */}
        <nav className="text-xl flex gap-x-4 lg:gap-x-12">
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </nav>
        {/* button */}
        <div className="btn-client btn-primary-client lg:btn-outline-client">
          Sign up
        </div>
      </div>
    </header>
  );
};

export default Header;
