import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from './UserRepository.interface';

@Injectable()
export class UserMemoryRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: string): Promise<User> {
    return await this.findById(id);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const foundUser = await this.findById(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') return;
      foundUser[key] = value;
    });

    return foundUser;
  }

  async delete(id: string): Promise<void> {
    const foundUser = await this.findById(id);
    this.users = this.users.filter((user) => user.id !== foundUser.id);
  }

  private async findById(id: string) {
    const foundUser = this.users.find((user) => user.id === id);
    if (!foundUser) throw new Error('User not found');
    return foundUser;
  }

  async hasWithEmail(email: string): Promise<boolean> {
    return this.users.find((user) => user.email === email) !== undefined;
  }
}
