import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { IsEmailUniqueValidator } from './validations/is-email-unique.validador';

@Module({
  controllers: [UsersController],
  providers: [UserRepository, UsersService, IsEmailUniqueValidator],
})
export class UsersModule {}
