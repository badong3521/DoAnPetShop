export interface PetDisease {
  id: string;
  name: string;
  description?: string;
  severity: string;
  createdAt: string;
  updatedAt: string;
}

export type PetDiseaseBodyData = {
  name: string;
  description?: string;
  severity: string;
};
