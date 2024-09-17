import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '@app/repositories/user-repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userRepository: UserRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('req.user????', req.user);

    const userId = req.headers['user-id'];

    if (!userId) {
      throw new HttpException('User ID not provided', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userRepository.findById(userId as string);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    req.user = { role: user.role }; // Gán vai trò vào req.user
    next();
  }
}
