import { User } from '../entities/user.entity';

export interface UserRepository {
  save(user: User): Promise<User>;

  getAll(): Promise<User[]>;

  getById(id: string): Promise<User>;

  update(id: string, data: Partial<User>): Promise<User>;

  delete(id: string): Promise<void>;

  hasWithEmail(email: string): Promise<boolean>;
}
