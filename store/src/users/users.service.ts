import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './user.entity';
import { ListAllUserDTO } from './dto/listAllUser.dto';
import { GetUserDTO } from './dto/getUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async listAll(): Promise<ListAllUserDTO[]> {
    return this.userRepository.getAll();
  }

  async getById(id: string): Promise<GetUserDTO> {
    return this.userRepository.getById(id);
  }

  async updateUser(id: string, data: Partial<User>): Promise<GetUserDTO> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
