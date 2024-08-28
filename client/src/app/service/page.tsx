'use client'
import { useQuery } from "@tanstack/react-query";
import {
  fetchPetShopServices,
  PET_SHOP_SERVICE_KEY,
} from "@/services/queries/PetshopServices";
import Image from "next/image";
import Service1Icon from "@/public/img/services/service-icon1.svg";

export default function Service() {
  const petShopServicesListQuery = useQuery({
    queryKey: [PET_SHOP_SERVICE_KEY],
    queryFn: fetchPetShopServices,
  });

  return (
    <div className="grid max-w-2xl grid-cols-1 gap-x-8 md:gap-y-16 gap-y-8 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none sm:grid-cols-2 lg:grid-cols-3">
      {/* {petShopServicesListQuery.data?.services.map((service, index) => {
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
              <button className="btn-client btn-primary-client">Explore</button>
            </div>
          </div>
        );
      })} */}
    </div>
  );
}
