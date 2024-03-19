import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validations/is-email-unique.validador';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsEmailUnique()
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsOptional()
  password: string;
}
