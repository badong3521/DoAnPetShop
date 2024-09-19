import { Role } from '@app/entities/user';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListCustomersService {
  constructor(
    private customerRepository: CustomerRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (user && user.role === Role.ADMIN) {
      return await this.customerRepository.findMany();
    } else {
      return await this.customerRepository.findByUserId(userId);
    }
  }
}
