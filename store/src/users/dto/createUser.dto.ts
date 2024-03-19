import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validations/is-email-unique.validador';

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
