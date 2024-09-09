"use client";

import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AsynchronousContent } from "@/components/AsynchronousContent";
import { PageTitle } from "@/components/dashboard/PageTitle";
import {
  fetchPetDisease,
  PET_DISEASE_KEY,
  updatePetDisease,
} from "@/services/queries/PetDiseases";
import { toast } from "react-hot-toast";
import { PetDiseaseBodyData } from "@/@types/PetDisease";
import { PetDiseaseForm } from "@/components/pet-disease/PetDiseaseForm";

interface EditPetDiseaseMutationPayload {
  id: string;
  data: PetDiseaseBodyData;
}

export default function EditPetDisease({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();

  const petDiseaseShowQuery = useQuery({
    queryKey: [PET_DISEASE_KEY, params.id],
    queryFn: () => fetchPetDisease(params.id),
  });

  const editPetDiseaseMutation = useMutation({
    mutationFn: (payload: EditPetDiseaseMutationPayload) =>
      updatePetDisease(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PET_DISEASE_KEY] });
      toast.success("Bệnh thú cưng đã được chỉnh sửa thành công!");
    },
    onError: () => {
      toast.error("Ối. Đã xảy ra sự cố khi cố gắng chỉnh sửa bệnh thú cưng.");
    },
  });

  const showPetDiseaseErrorMessage = () => {
    const error = petDiseaseShowQuery.error;
    if (axios.isAxiosError(error) && error.response?.status === 404)
      return "Lỗi! Không tìm thấy bệnh thú cưng.";
  };

  async function handleEditPetDisease(data: PetDiseaseBodyData) {
    editPetDiseaseMutation.mutate({ id: params.id, data });
  }

  return (
    <div>
      <PageTitle renderBackOption title="Chỉnh sửa bệnh thú cưng" />

      <AsynchronousContent
        status={petDiseaseShowQuery.status}
        errorMessage={showPetDiseaseErrorMessage()}
      >
        <PetDiseaseForm
          disease={petDiseaseShowQuery.data}
          onSubmit={handleEditPetDisease}
          isLoading={editPetDiseaseMutation.isLoading}
        />
      </AsynchronousContent>
    </div>
  );
}
