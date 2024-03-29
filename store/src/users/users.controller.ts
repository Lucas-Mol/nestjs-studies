import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { OmittedResponseUser } from './dto/omitted-response-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const user: User = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;

    const persistedUser: User = await this.userService.create(user);
    return new OmittedResponseUser(
      persistedUser.id,
      persistedUser.name,
      persistedUser.email,
    );
  }

  @Get()
  async findAll() {
    const users: User[] = await this.userService.findAll();
    return users.map(
      (user) => new OmittedResponseUser(user.id, user.name, user.email),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foundUser: User = await this.userService.findOne(id);
    return new OmittedResponseUser(
      foundUser.id,
      foundUser.name,
      foundUser.email,
    );
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser: User = await this.userService.update(id, updateUserDto);
    return new OmittedResponseUser(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
