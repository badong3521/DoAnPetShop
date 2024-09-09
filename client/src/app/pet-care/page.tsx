"use client";

import ComponentMain from "@/components/main-component";
import {
  PET_DISEASE_KEY,
  fetchPetDiseases,
} from "@/services/queries/PetDiseases";
import { useQuery } from "@tanstack/react-query";
import CardPetCare from "./components/card-pet-care";

export default function PetCare() {
  const petDiseasesListQuery = useQuery({
    queryKey: [PET_DISEASE_KEY],
    queryFn: fetchPetDiseases,
  });

  return (
    <div className="bg-cream max-w-[1440px] mx-auto overflow-hidden">
      <ComponentMain>
        <section className="bg-services bg-cover bg-no-repeat bg-center py-8">
          <div className="container mx-auto ">
            <h2 className="h2 mb-12">Chăm sóc thú cưng</h2>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                {petDiseasesListQuery?.data?.map((item) => (
                  <CardPetCare
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    severity={item.severity}
                    description={item.description}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </ComponentMain>
    </div>
  );
}
