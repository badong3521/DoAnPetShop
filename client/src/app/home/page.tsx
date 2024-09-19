"use client";

import Adoption from "@/components/home/Adoption";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import Pets from "@/components/home/Pets";
import ComponentMain from "@/components/main-component";
import {
  PET_SHOP_SERVICE_KEY,
  fetchPetShopServices,
} from "@/services/queries/PetshopServices";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Service1Icon from "@/public/img/services/service-icon1.svg";
import { EmptyState, ErrorState, LoadingState } from "../services/page";

const Home = () => {
  const petShopServicesListQuery = useQuery({
    queryKey: [PET_SHOP_SERVICE_KEY],
    queryFn: fetchPetShopServices,
  });

  const renderServices = () => {
    switch (true) {
      case petShopServicesListQuery.isLoading:
        return <LoadingState />;
      case petShopServicesListQuery.isError:
        return <ErrorState />;
      case !petShopServicesListQuery.data?.services.length:
        return <EmptyState />;
      default:
        return (
          <div className="grid max-w-2xl grid-cols-1 gap-x-8 md:gap-y-16 gap-y-8 pt-5 sm:pt-8 lg:mx-0 lg:max-w-none sm:grid-cols-2 lg:grid-cols-3">
            {petShopServicesListQuery.data?.services.map((service, index) => {
              return (
                <Link
                  href={{
                    pathname: `/services/${service.id}`,
                    query: { id: service?.id },
                  }}
                  className="border flex flex-col h-full border-primary/20 bg-cream rounded-[66px] py-16 px-8 group cursor-pointer transition-all duration-300 hover:border-orange-hover"
                  key={index}
                >
                  <>
                    <Image
                      className="mb-9 m-auto"
                      src={Service1Icon}
                      alt={""}
                    />
                    <div className="text-[26px] font-medium mb-4">
                      {service.title}
                    </div>
                  </>
                  <div className="w-full flex-1 flex flex-col justify-end">
                    <Button className="btn-client btn-primary-client">
                      Khám phá
                    </Button>
                  </div>
                </Link>
              );
            })}
          </div>
        );
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
      <ComponentMain>
        <Hero />
        <Pets />
        <section className="bg-services bg-cover bg-no-repeat bg-center py-8">
          <div className="container mx-auto ">
            <h2 className="h2">Các Dịch Vụ Của Chúng Tôi</h2>
            {renderServices()}
          </div>
        </section>
        <Adoption />
        <Newsletter />
      </ComponentMain>
    </div>
  );
};

export default Home;
