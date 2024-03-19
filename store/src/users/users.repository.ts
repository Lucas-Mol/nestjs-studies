import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { ListAllUserDTO } from './dto/listAllUser.dto';
import { GetUserDTO } from './dto/getUser.dto';
import { UserNotFoundError } from './errors/user-not-found.error';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async getAll(): Promise<ListAllUserDTO[]> {
    const usersDTO: ListAllUserDTO[] = this.users.map(
      (user) => new ListAllUserDTO(user.id, user.name),
    );
    return usersDTO;
  }

  async getById(id: string): Promise<GetUserDTO> {
    const foundUser = await this.findById(id);
    return new GetUserDTO(foundUser.id, foundUser.name, foundUser.password);
  }

  async update(id: string, data: Partial<User>): Promise<GetUserDTO> {
    const foundUser = await this.findById(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') return;
      foundUser[key] = value;
    });

    return new GetUserDTO(foundUser.id, foundUser.name, foundUser.email);
  }

  async delete(id: string) {
    const foundUser = await this.findById(id);
    this.users = this.users.filter((user) => user.id !== foundUser.id);
  }

  async findById(id: string) {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) throw new UserNotFoundError('User not found');
    return foundUser;
  }

  async hasWithEmail(email: string): Promise<boolean> {
    return this.users.find((user) => user.email === email) !== undefined;
  }
}
