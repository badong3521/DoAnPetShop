"use client";

import { About } from "@/components/About";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CaretDown, CaretUp, PawPrint } from "phosphor-react";

export default function Home() {
  const handleScrollBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToAboutSection = () => {
    const element = document.getElementById("about-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-full min-h-screen flex flex-col text-white">
      <Header />

      <section className="hero min-h-[calc(100vh-66px)] bg-base-100 relativ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold underline flex items-end gap-4 justify-center">
              <PawPrint size={32} weight="fill" /> PETSHOP{" "}
              <PawPrint size={32} weight="fill" />
            </h1>
            <p className="py-6 text-white">
              Trong hệ thống Petshop này, hãy đăng ký khách hàng, vật
              nuôi và dịch vụ và dễ dàng quản lý các cuộc hẹn.
            </p>
            <Button bg="primary" asChild>
              <Link href="/dashboard">Bắt đầu</Link>
            </Button>
          </div>
        </div>

        <button
          onClick={handleScrollToAboutSection}
          className="absolute bottom-10 right-1/2 translate-x-1/2 flex items-center justify-center p-2"
        >
          <CaretDown size={32} weight="regular" className="animate-bounce" />
        </button>
      </section>

      <section
        id="about-section"
        className="relative min-h-screen bg-base-300 flex justify-center items-center p-4"
      >
        <About transparentBg={false} />

        <button
          onClick={handleScrollBackToTop}
          className="absolute bottom-2 right-2 flex items-center justify-center p-2"
        >
          <CaretUp size={32} weight="regular" className="animate-bounce" />
        </button>
      </section>
    </div>
  );
}
