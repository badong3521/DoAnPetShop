"use client";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AsynchronousContent } from "@/components/AsynchronousContent";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { ServiceForm } from "@/components/services/ServiceForm";
import {
  fetchPetshopService,
  PETSHOPSERVICE_KEY,
  updatePetshopService,
} from "@/services/queries/PetshopServices";
import { toast } from "react-hot-toast";
import { PetshopServiceBodyData } from "@/@types/PetshopServices";
import { convertCentsToReais } from "@/utils/currency";

interface EditPetshopServiceMutationPayload {
  id: string;
  data: PetshopServiceBodyData;
}
export default function EditService({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();

  const petshopServiceShowQuery = useQuery({
    queryKey: [PETSHOPSERVICE_KEY, params.id],
    queryFn: () => fetchPetshopService(params.id),
  });

  const editPetshopServiceMutation = useMutation({
    mutationFn: (payload: EditPetshopServiceMutationPayload) =>
      updatePetshopService(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PETSHOPSERVICE_KEY] });
      toast.success("Dịch vụ đã được chỉnh sửa thành công!");
    },
    onError: () => {
      toast.error("Ối. Đã xảy ra sự cố khi cố gắng chỉnh sửa dịch vụ.");
    },
  });

  const showPetshopServiceErrorMessage = () => {
    const error = petshopServiceShowQuery.error;
    if (axios.isAxiosError(error) && error.response?.status === 404)
      return "Lỗi! Không tìm thấy dịch vụ.";
  };

  async function handleEditService(data: PetshopServiceBodyData) {
    const parsedData: PetshopServiceBodyData = {
      ...data,
      value: convertCentsToReais(data.value),
    };

    editPetshopServiceMutation.mutate({ id: params.id, data: parsedData });
  }

  return (
    <div>
      <PageTitle renderBackOption title="Chỉnh sửa dịch vụ" />

      <AsynchronousContent
        status={petshopServiceShowQuery.status}
        errorMessage={showPetshopServiceErrorMessage()}
      >
        <ServiceForm
          service={petshopServiceShowQuery.data?.service}
          onSubmit={handleEditService}
          isLoading={editPetshopServiceMutation.isLoading}
        />
      </AsynchronousContent>
    </div>
  );
}
