import { IsString, IsOptional, IsUUID, MaxLength } from 'class-validator';

export class PetDiseaseDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @IsString()
  severity: string;
}

export class CreatePetDiseaseBody extends PetDiseaseDTO {}

export class UpdatePetDiseaseBody extends PetDiseaseDTO {}

export class PetDiseaseResponse extends PetDiseaseDTO {
  @IsUUID()
  id: string;

  createdAt: Date;
  updatedAt: Date;
}
