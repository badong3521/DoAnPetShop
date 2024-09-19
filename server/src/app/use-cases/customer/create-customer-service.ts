import { Customer, CustomerPet } from '@app/entities/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { ConflictException, Injectable } from '@nestjs/common';

interface CreateCustomerRequest {
  name: string;
  phone: string;
  pets?: CustomerPet[];
  userId: string;
}

@Injectable()
export class CreateCustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(request: CreateCustomerRequest) {
    const { name, phone, pets = [], userId } = request;

    const existingCustomer = await this.customerRepository.findByName(name);

    if (existingCustomer.length !== 0) {
      throw new ConflictException('Khách hàng với tên này đã tồn tại');
    }

    const customer = new Customer({ name, phone, pets, userId });

    await this.customerRepository.create(customer);

    return {
      customer,
    };
  }
}
