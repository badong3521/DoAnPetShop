import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function ComponentMain({ children }: Props) {
  return (
    <div className="bg-cream max-w-[1440px] mx-auto overflow-hidden">
      <Header className="bg-cream border border-b-black" />
      <div className="min-h-[750px]">{children}</div>
      <Footer />
    </div>
  );
}

export default ComponentMain;
