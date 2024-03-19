import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserMemoryRepository } from './repositories/UserMemory.repository';
import { OmittedResponseUser } from './dto/omitted-response-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserMemoryRepository) {}

  async createUser(user: User): Promise<OmittedResponseUser> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<OmittedResponseUser[]> {
    return this.userRepository.getAll();
  }

  async findOne(id: string): Promise<OmittedResponseUser> {
    return this.userRepository.getById(id);
  }

  async update(id: string, data: Partial<User>): Promise<OmittedResponseUser> {
    return this.userRepository.update(id, data);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
