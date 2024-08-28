"use client";

import Adoption from "@/components/home/Adoption";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Pets from "@/components/home/Pets";
import Services from "@/components/home/Services";

export default function Service() {
  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <Header className="bg-cream border border-b-orange-hover"/>
      <Services />
      <Footer />
    </div>
  );
}
