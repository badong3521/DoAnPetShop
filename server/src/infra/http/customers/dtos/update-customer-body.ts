import { Length, } from "class-validator"

export class UpdateCustomerBody {
  @Length(3, 60)
  name: string

  @Length(8, 60)
  phone: string
}