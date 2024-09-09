import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { UpdatePetDiseaseDto } from './pet-disease.controller';
import { CreatePetDiseaseBody } from './dtos/pet-diseases';

@Injectable()
export class PetDiseaseService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.petDisease.findMany();
  }

  async findById(id: string) {
    return this.prisma.petDisease.findUnique({ where: { id } });
  }

  async create(data: CreatePetDiseaseBody) {
    if (!data.name) {
      throw new Error('Name is required for creating a pet disease');
    }

    return await this.prisma.petDisease.create({
      data: {
        name: data.name,
        description: data.description || '',
        severity: data.severity || 'Nhẹ',
      },
    });
  }

  async update(id: string, data: UpdatePetDiseaseDto) {
    return this.prisma.petDisease.update({ where: { id }, data });
  }

  async delete(id: string) {
    await this.prisma.petDisease.delete({ where: { id } });
  }
}
