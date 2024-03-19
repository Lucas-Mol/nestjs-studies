import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './user.entity';
import { GetUserDTO } from './dto/getUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserNotFoundError } from './errors/user-not-found.error';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    const user = new User(data);
    await this.usersService.createUser(user);
    return { user: new GetUserDTO(user.id, user.name, user.email) };
  }

  @Get()
  async listAll() {
    return await this.usersService.listAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    try {
      return await this.usersService.getById(id);
    } catch (error) {
      if (error instanceof UserNotFoundError) return { error: error.message };
    }
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    try {
      return await this.usersService.updateUser(id, data);
    } catch (error) {
      if (error instanceof UserNotFoundError) return { error: error.message };
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    try {
      return await this.usersService.deleteUser(id);
    } catch (error) {
      if (error instanceof UserNotFoundError) return { error: error.message };
    }
  }
}
