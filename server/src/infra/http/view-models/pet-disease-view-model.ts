import { PetDisease } from '@prisma/client';

export class PetDiseaseViewModel {
  static toHTTP(petDisease: PetDisease) {
    return {
      id: petDisease.id,
      name: petDisease.name,
      description: petDisease.description,
      severity: petDisease.severity,
      createdAt: petDisease.createdAt,
      updatedAt: petDisease.updatedAt,
    };
  }
}
