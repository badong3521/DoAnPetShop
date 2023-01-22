import { Type } from "class-transformer"
import { IsDate, IsUUID } from "class-validator"

export class CreateAppointmentBody {
  @IsUUID()
  customerId: string

  @IsUUID()
  petId: string

  @IsUUID()
  serviceId: string

  @IsDate()
  @Type(() => Date)
  appointmentTime: Date
}