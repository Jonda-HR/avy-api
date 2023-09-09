import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { HandleErrorModule } from 'src/utilities/handleError/handleError.module';

@Module({
  imports: [UserModule, HandleErrorModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
