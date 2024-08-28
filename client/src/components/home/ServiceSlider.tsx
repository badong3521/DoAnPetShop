"use client";
import React from "react";
import Image from "next/image";
import Service1Icon from "@/public/img/services/service-icon1.svg";
import Service2Icon from "@/public/img/services/service-icon2.svg";
import Service3Icon from "@/public/img/services/service-icon3.svg";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPetShopServices,
  PET_SHOP_SERVICE_KEY,
} from "@/services/queries/PetshopServices";
import { Button } from "../ui/Button";

// const services = [
//   {
//     image: Service1Icon,
//     name: "Pharmacy",
//     description:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
//     btnText: "Explore",
//   },
//   {
//     image: Service2Icon,
//     name: "Breed-specific Haircuts",
//     description:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
//     btnText: "Explore",
//   },
//   {
//     image: Service3Icon,
//     name: "Cloths",
//     description:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
//     btnText: "Explore",
//   },
//   {
//     image: Service3Icon,
//     name: "Cloths",
//     description:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
//     btnText: "Explore",
//   },
//   {
//     image: Service3Icon,
//     name: "Cloths",
//     description:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
//     btnText: "Explore",
//   },
//   {
//     image: Service3Icon,
//     name: "Cloths",
//     description:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
//     btnText: "Explore",
//   },
//   {
//     image: Service3Icon,
//     name: "Cloths",
//     description:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
//     btnText: "Explore",
//   },
//   {
//     image: Service3Icon,
//     name: "Cloths",
//     description:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
//     btnText: "Explore",
//   },
//   {
//     image: Service3Icon,
//     name: "Cloths",
//     description:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dicta, modi voluptate dolorum eaque quisquam quaerat cumque? Libero, accusamus corporis?",
//     btnText: "Explore",
//   },
// ];

const ServiceSlider = () => {
  const petShopServicesListQuery = useQuery({
    queryKey: [PET_SHOP_SERVICE_KEY],
    queryFn: fetchPetShopServices,
  });

  console.log("Data", petShopServicesListQuery.data?.services);

  return (
    <div className="grid max-w-2xl grid-cols-1 gap-x-8 md:gap-y-16 gap-y-8 pt-5 sm:pt-8 lg:mx-0 lg:max-w-none sm:grid-cols-2 lg:grid-cols-3">
      {petShopServicesListQuery.data?.services.map((service, index) => {
        return (
          <div
            className="border flex flex-col h-full border-primary/20 bg-cream rounded-[66px] py-16 px-8 group cursor-pointer transition-all duration-300 hover:border-orange-hover"
            key={index}
          >
            <>
              <Image className="mb-9" src={Service1Icon} alt={""} />
              <div className="text-[26px] font-medium mb-4">
                {service.title}
              </div>
              <div className="text-[20px] mb-8 break-words ">
                {service.description}
              </div>
            </>
            <div className="w-full flex-1 flex flex-col justify-end">
              <Button className="btn-client btn-primary-client">Explore</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceSlider;
