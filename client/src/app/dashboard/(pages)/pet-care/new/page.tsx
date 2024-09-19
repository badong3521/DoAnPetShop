"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  createPetDisease,
  PET_DISEASE_KEY,
} from "@/services/queries/PetDiseases";
import { PetDiseaseBodyData } from "@/@types/PetDisease";
import { PetDiseaseForm } from "@/components/pet-disease/PetDiseaseForm";

export default function NewPetDisease() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createPetDiseaseMutation = useMutation({
    mutationFn: (data: PetDiseaseBodyData) => createPetDisease(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PET_DISEASE_KEY] });
      toast.success("Bệnh thú cưng được tạo thành công!");
      router.push("/dashboard/pet-care");
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("Ối. Đã xảy ra sự cố khi tạo bệnh thú cưng.");
    },
  });

  async function handleCreatePetDisease(data: PetDiseaseBodyData) {
    createPetDiseaseMutation.mutate(data);
  }

  return (
    <div>
      <PageTitle renderBackOption title="Bệnh thú cưng mới" />
      <PetDiseaseForm
        onSubmit={handleCreatePetDisease}
        isLoading={createPetDiseaseMutation.isLoading}
      />
    </div>
  );
}
