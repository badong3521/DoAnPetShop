import { HashGenerator } from '@app/cryptography/hash-generator';
import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(userData: { name: string; email: string; password: string }) {
    const hashedPassword = await this.hashGenerator.hash(userData.password);

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại trong hệ thống.');
    }

    if (userData.password.length < 8) {
      throw new BadRequestException('Mật khẩu phải có ít nhất 8 ký tự.');
    }

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
