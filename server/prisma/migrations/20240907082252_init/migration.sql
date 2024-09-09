/*
  Warnings:

  - You are about to drop the `_PetToPetDisease` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PetToPetDisease` DROP FOREIGN KEY `_PetToPetDisease_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PetToPetDisease` DROP FOREIGN KEY `_PetToPetDisease_B_fkey`;

-- AlterTable
ALTER TABLE `PetDisease` ADD COLUMN `petId` VARCHAR(191) NULL,
    MODIFY `description` TEXT NULL;

-- DropTable
DROP TABLE `_PetToPetDisease`;

-- AddForeignKey
ALTER TABLE `PetDisease` ADD CONSTRAINT `PetDisease_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
