import { PetDisease } from "@/@types/PetDisease";
import api from "../api";

export const PET_DISEASE_KEY = "pet-disease-fetch";

interface PetDiseasesReturn {
  petDiseases: PetDisease[];
}

interface PetDiseaseReturn {
  petDisease: PetDisease;
}

export interface CreatePetDiseaseData {
  name: string;
  description?: string;
  severity: string;
}

export interface UpdatePetDiseaseData {
  name?: string;
  description?: string;
  severity?: string;
}

export async function fetchPetDiseases() {
  const { data } = await api.get<PetDiseasesReturn>("/pet-diseases");
  return data;
}

export async function fetchPetDisease(id: string) {
  const { data } = await api.get<PetDiseaseReturn>(`/pet-diseases/${id}`);
  return data;
}

export async function createPetDisease(petDisease: CreatePetDiseaseData) {
  console.log("CLIENT", petDisease);

  if (!petDisease || Object.keys(petDisease).length === 0) {
    throw new Error("Pet disease data is empty");
  }

  try {
    const { data } = await api.post<PetDiseaseReturn>(
      "/pet-diseases",
      petDisease
    );
    console.log("Response from server:", data);
    return data;
  } catch (error) {
    console.error("Error creating pet disease:", error);
    throw error;
  }
}

export async function updatePetDisease(
  id: string,
  petDisease: UpdatePetDiseaseData
) {
  const { data } = await api.put<PetDiseaseReturn>(
    `/pet-diseases/${id}`,
    petDisease
  );
  return data;
}

export async function deletePetDisease(id: string) {
  const { data } = await api.delete<{ message: string }>(`/pet-diseases/${id}`);
  return data;
}
