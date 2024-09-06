import { Customer, CustomerPet } from '@app/entities/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { ConflictException, Injectable } from '@nestjs/common';

interface CreateCustomerRequest {
  name: string;
  phone: string;
  pets?: CustomerPet[];
}

@Injectable()
export class CreateCustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(request: CreateCustomerRequest) {
    const { name, phone, pets = [] } = request;

    const existingCustomer = await this.customerRepository.findByName(name);
    console.log('existingCustomer', existingCustomer);

    if (existingCustomer.length !== 0) {
      throw new ConflictException('Khách hàng với tên này đã tồn tại');
    }

    const customer = new Customer({ name, phone, pets });

    await this.customerRepository.create(customer);

    return {
      customer,
    };
  }
}
