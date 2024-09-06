import { PetShopService } from "@/@types/PetshopServices";
import api from "../api";

// Query key
export const PET_SHOP_SERVICE_KEY = "petshopService-fetch";

interface PetshopServicesReturn {
  services: PetShopService[];
}
export async function fetchPetShopServices() {
  const { data } = await api.get<PetshopServicesReturn>(`/services`);

  return data;
}

export async function fetchPetshopService(id: string) {
  const { data } = await api.get<{ service: PetShopService }>(
    `/services/${id}`
  );

  return data;
}

export async function createPetshopService(
  petshopService: Omit<PetShopService, "id">
) {

  await api.post("/services", {
    ...petshopService,
  });
}

export async function updatePetshopService(
  id: string,
  petshopService: Omit<PetShopService, "id">
) {
  await api.put(`/services/${id}`, {
    ...petshopService,
  });
}

export async function deletePetshopService(id: string) {
  await api.delete(`/services/${id}`);
}
