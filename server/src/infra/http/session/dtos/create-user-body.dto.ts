import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Invalid email address' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  readonly password: string;
}
