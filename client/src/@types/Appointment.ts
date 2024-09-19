import { Pet } from "./Pet"
import { PetShopService } from "./PetshopServices"

export enum AppointmentStatus {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DONE = "DONE",
}

export type Appointment = {
  id: string
  appointmentTime: Date
  status: AppointmentStatus
  pet: Pet
  service?: PetShopService
}