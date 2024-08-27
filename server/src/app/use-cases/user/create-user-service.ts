import { HashGenerator } from '@app/cryptography/hash-generator';
import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(userData: { name: string; email: string; password: string }) {
    const hashedPassword = await this.hashGenerator.hash(userData.password);

    const user = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      refreshToken: null,
    });

    await this.userRepository.upsert(user);

    return user;
  }
}
