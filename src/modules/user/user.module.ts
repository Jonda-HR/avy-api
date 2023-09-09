import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { RoleUser } from './entities/roleUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandleErrorModule } from 'src/utilities/handleError/handleError.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, RoleUser]), HandleErrorModule],
  exports: [TypeOrmModule, UserService],
  providers: [UserResolver, UserService],
})
export class UserModule {}
