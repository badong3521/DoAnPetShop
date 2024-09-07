import { Module } from '@nestjs/common';
import { PetDiseaseController } from './pet-disease.controller';
import { PetDiseaseService } from './pet-disease.service';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PetDiseaseController],
  providers: [PetDiseaseService, PrismaService],
})
export class PetDiseaseModule {}
