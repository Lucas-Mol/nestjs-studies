import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserMemoryRepository } from '../repositories/UserMemory.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserMemoryRepository) {}

  async validate(value: any): Promise<boolean> {
    const usuarioComEmailExiste = await this.userRepository.hasWithEmail(value);
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
