import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { IsEmailUniqueValidator } from './validations/is-email-unique.validator';
import { User } from './entities/user.entity';
import { UserTypeOrmRepository } from './repositories/UserTypeOrm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserService, IsEmailUniqueValidator, UserTypeOrmRepository],
})
export class UsersModule {}
