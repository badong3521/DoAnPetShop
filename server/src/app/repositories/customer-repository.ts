import { Customer } from '@app/entities/customer';

export abstract class CustomerRepository {
  abstract findById(id: string): Promise<Customer | null>;
  abstract findMany(): Promise<Customer[]>;
  abstract findByUserId(userId: string): Promise<Customer[]>;
  abstract create(customer: Customer): Promise<void>;
  abstract save(customer: Customer): Promise<void>;
  abstract deleteById(id: string): Promise<void>;
  abstract findByName(name: string): Promise<Customer[]>;
}
