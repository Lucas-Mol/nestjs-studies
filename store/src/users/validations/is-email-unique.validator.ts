import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(value: any): Promise<boolean> {
    const usuarioComEmailExiste = await this.usersService.hasWithEmail(value);
    return !usuarioComEmailExiste;
  }
  defaultMessage?(): string {
    return 'this email is already signed up';
  }
}

export const IsEmailUnique = (options?: ValidationOptions) => {
  return (object: object, prop: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: prop,
      options: options,
      constraints: [],
      validator: IsEmailUniqueValidator,
    });
  };
};
