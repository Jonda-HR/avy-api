import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { RoleUser } from './entities/roleUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, RoleUser])],
  exports: [TypeOrmModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
