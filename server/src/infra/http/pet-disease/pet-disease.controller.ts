import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PetDiseaseService } from './pet-disease.service';
import { PetDiseaseViewModel } from '../view-models/pet-disease-view-model';
import {
  CreatePetDiseaseBody,
  UpdatePetDiseaseBody,
} from './dtos/pet-diseases';

export class CreatePetDiseaseDto {
  name: string;
  description: string;
  severity: string;
}

export class UpdatePetDiseaseDto {
  name?: string;
  description?: string;
  severity?: string;
}

@Controller('pet-diseases')
export class PetDiseaseController {
  constructor(private readonly petDiseaseService: PetDiseaseService) {}

  @Get()
  async getAllPetDiseases() {
    const petDiseases = await this.petDiseaseService.findAll();
    return petDiseases.map(PetDiseaseViewModel.toHTTP);
  }

  @Get(':id')
  async getPetDisease(@Param('id') id: string) {
    const petDisease = await this.petDiseaseService.findById(id);
    if (!petDisease) {
      throw new NotFoundException(`Pet disease with ID ${id} not found`);
    }
    return PetDiseaseViewModel.toHTTP(petDisease);
  }

  @Post()
  async createPetDisease(@Body() body: CreatePetDiseaseBody) {
    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException('Request body is empty');
    }

    if (!body.name) {
      throw new BadRequestException(
        'Name is required for creating a pet disease',
      );
    }

    try {
      const createdDisease = await this.petDiseaseService.create(body);
      console.log('Created disease:', createdDisease);
      return createdDisease;
    } catch (error) {
      console.error('Error creating pet disease:', error);
      throw error;
    }
  }

  @Put(':id')
  async updatePetDisease(
    @Param('id') id: string,
    @Body() updatePetDiseaseDto: UpdatePetDiseaseBody,
  ) {
    const petDisease = await this.petDiseaseService.update(
      id,
      updatePetDiseaseDto,
    );
    return PetDiseaseViewModel.toHTTP(petDisease);
  }

  @Delete(':id')
  async deletePetDisease(@Param('id') id: string) {
    await this.petDiseaseService.delete(id);
  }
}
