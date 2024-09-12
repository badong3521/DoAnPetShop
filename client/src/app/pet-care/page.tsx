"use client";

import ComponentMain from "@/components/main-component";
import {
  PET_DISEASE_KEY,
  fetchPetDiseases,
} from "@/services/queries/PetDiseases";
import { useQuery } from "@tanstack/react-query";
import CardPetCare from "./components/card-pet-care";
import { useState } from "react";

export interface PetDisease {
  id: string;
  name: string;
  description: string;
  severity: string;
  createdAt: string;
  updatedAt: string;
}

export default function PetCare() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const petDiseasesListQuery = useQuery({
    queryKey: [PET_DISEASE_KEY],
    queryFn: fetchPetDiseases,
  });

  const filteredDiseases = petDiseasesListQuery.data?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-cream max-w-[1440px] mx-auto overflow-hidden">
      <ComponentMain>
        <section className="bg-services bg-cover bg-no-repeat bg-center py-8">
          <div className="container mx-auto ">
            <div className="flex justify-between items-baseline">
              <h2 className="h2 mb-12">Chăm sóc thú cưng</h2>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Tìm kiếm Pet Care..."
                  className="w-full p-2 border border-slate-500 rounded bg-cream"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {filteredDiseases && filteredDiseases.length > 0 ? (
                <div className="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                  {filteredDiseases.map((item) => (
                    <CardPetCare
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      severity={item.severity}
                      description={item.description}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 h-72">
                  <>
                    <h3 className="text-xl font-semibold mb-2">
                      Không tìm thấy kết quả
                    </h3>
                    <p>Không có kết quả nào cho tìm kiếm {searchTerm}</p>
                  </>
                </div>
              )}
            </div>
          </div>
        </section>
      </ComponentMain>
    </div>
  );
}
