import React from "react";
import Image from "next/image";
import pretitleImg from "@/public/img/hero/pretitle-img.svg";
import Header from "./Header";

const Hero = () => {
  return (
    <section className="bg-cream bg-hero lg:bg-cover lg:bg-no-repeat min-h-[400px] lg:min-h-[805px]">
      <Header />
      <div className="container mx-auto flex justify-start items-center min-h-[400px] lg:h-[805px]">
        <div className="lg:max-w-[650px] text-center mx-auto lg:text-left lg:mx-0">
          {/* image */}
          <div className="hidden xl:flex mb-6 ml-5">
            <div className="hidden xl:flex mb-6 ml-5" style={{ width: "100%" }}>
              <Image src={pretitleImg} layout="responsive" alt="" />
            </div>
          </div>
          <h1 className="text-5l lg:text-8xl uppercase font-bold -tracking-[0.05em] mb-10">
            MỌI THÚ CƯNG <br />
            <span className="text-orange font-normal">TIẾP CẬN</span> <br />
            SỨC KHOẺ
          </h1>
          <button className="btn-client btn-orange-client mx-auto lg:mx-0">
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
