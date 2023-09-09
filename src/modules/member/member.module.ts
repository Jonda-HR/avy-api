import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { RoleGroup } from './entities/roleGroup.entity';
import { RoleMinistry } from './entities/roleMinistry.entity';
import { HandleErrorModule } from 'src/utilities/handleError/handleError.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, RoleGroup, RoleMinistry]),
    HandleErrorModule,
  ],
  exports: [TypeOrmModule],
  providers: [MemberResolver, MemberService],
})
export class MemberModule {}
