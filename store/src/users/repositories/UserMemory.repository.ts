import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { OmittedResponseUser } from '../dto/omitted-response-user.dto';
import { UserNotFoundError } from '../exceptions/user-not-found.exception';

@Injectable()
export class UserMemoryRepository {
  private users: User[] = [];

  async save(user: User): Promise<OmittedResponseUser> {
    this.users.push(user);
    return new OmittedResponseUser(user.id, user.name, user.email);
  }

  async getAll(): Promise<OmittedResponseUser[]> {
    const usersDTO: OmittedResponseUser[] = this.users.map(
      (user) => new OmittedResponseUser(user.id, user.name, user.email),
    );
    return usersDTO;
  }

  async getById(id: string): Promise<OmittedResponseUser> {
    const foundUser = await this.findById(id);
    return new OmittedResponseUser(
      foundUser.id,
      foundUser.name,
      foundUser.email,
    );
  }

  async update(id: string, data: Partial<User>): Promise<OmittedResponseUser> {
    const foundUser = await this.findById(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id') return;
      foundUser[key] = value;
    });

    return new OmittedResponseUser(
      foundUser.id,
      foundUser.name,
      foundUser.email,
    );
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
