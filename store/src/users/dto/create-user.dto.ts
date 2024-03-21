import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validations/is-email-unique.validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsEmailUnique()
  email: string;

  @MinLength(6)
  password: string;
}
