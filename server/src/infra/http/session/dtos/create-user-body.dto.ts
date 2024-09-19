import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Địa chỉ email không hợp lệ' })
  readonly email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @IsString()
  @MinLength(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' })
  readonly password: string;
}
