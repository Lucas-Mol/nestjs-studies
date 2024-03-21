import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserTypeOrmRepository } from './repositories/UserTypeOrm.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserTypeOrmRepository) {}

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.getById(id);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }

  async hasWithEmail(email: string): Promise<boolean> {
    return this.userRepository.hasWithEmail(email);
  }
}
