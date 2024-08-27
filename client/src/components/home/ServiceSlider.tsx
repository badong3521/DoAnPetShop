"use client";
import React from "react";
import Image from "next/image";
import Service1Icon from "@/public/img/services/service-icon1.svg";
import Service2Icon from "@/public/img/services/service-icon2.svg";
import Service3Icon from "@/public/img/services/service-icon3.svg";

const services = [
  {
    image: Service1Icon,
    name: "Pharmacy",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
    btnText: "Explore",
  },
  {
    image: Service2Icon,
    name: "Breed-specific Haircuts",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
    btnText: "Explore",
  },
  {
    image: Service3Icon,
    name: "Cloths",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
    btnText: "Explore",
  },
  {
    image: Service3Icon,
    name: "Cloths",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
    btnText: "Explore",
  },
  {
    image: Service3Icon,
    name: "Cloths",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
    btnText: "Explore",
  },
  {
    image: Service3Icon,
    name: "Cloths",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
    btnText: "Explore",
  },
  {
    image: Service3Icon,
    name: "Cloths",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
    btnText: "Explore",
  },
  {
    image: Service3Icon,
    name: "Cloths",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
    btnText: "Explore",
  },
  {
    image: Service3Icon,
    name: "Cloths",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
    btnText: "Explore",
  },
];

const ServiceSlider = () => {
  return (
    <div className="grid max-w-2xl grid-cols-1 gap-x-8 md:gap-y-16 gap-y-8 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => {
        return (
          <div key={index}>
            <div
              className="border h-full border-primary/20 bg-cream rounded-[66px] py-16 px-8 group cursor-pointer transition-all duration-300 hover:border-orange-hover"
              key={index}
            >
              <Image className="mb-9" src={service.image} alt={""} />
              <div className="text-[26px] font-medium mb-4">{service.name}</div>
              <div className="text-[20px] mb-8 break-words ">
                {service.description}
              </div>
              <button className="btn-client btn-primary-client">
                {service.btnText}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceSlider;
