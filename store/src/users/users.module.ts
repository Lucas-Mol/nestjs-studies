import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsEmailUniqueValidator } from './validations/is-email-unique.validator';
import { UserMemoryRepository } from './repositories/UserMemory.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsEmailUniqueValidator, UserMemoryRepository],
})
export class UsersModule {}
