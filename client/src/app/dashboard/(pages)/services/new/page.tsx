"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { ServiceForm } from "@/components/services/ServiceForm";
import {
  createPetshopService,
  PETSHOPSERVICE_KEY,
} from "@/services/queries/PetshopServices";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PetshopServiceBodyData } from "@/@types/PetshopServices";

export default function NewService() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createPetshopServiceMutation = useMutation({
    mutationFn: (data: PetshopServiceBodyData) => createPetshopService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PETSHOPSERVICE_KEY] });
      toast.success("Dịch vụ được tạo thành công!");
      router.push("/dashboard/services");
    },
    onError: (err) => {
      console.log("err", err);
      toast.error("Ối. Đã xảy ra sự cố khi tạo dịch vụ.");
    },
  });

  async function handleCreateService(data: PetshopServiceBodyData) {
    const parsedData: PetshopServiceBodyData = {
      ...data,
      value: data.value,
    };

    createPetshopServiceMutation.mutate(parsedData);
  }

  return (
    <div>
      <PageTitle renderBackOption title="Dịch vụ mới" />

      <ServiceForm
        onSubmit={handleCreateService}
        isLoading={createPetshopServiceMutation.isLoading}
      />
    </div>
  );
}
