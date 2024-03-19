import { v4 as uuid } from 'uuid';
import { CreateUserDTO } from './dto/createUser.dto';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(createUserDTO: CreateUserDTO) {
    this.id = uuid();
    this.name = createUserDTO.name;
    this.email = createUserDTO.email;
    this.password = createUserDTO.password;
  }
}
