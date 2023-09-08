import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { RoleGroup } from './entities/roleGroup.entity';
import { RoleMinistry } from './entities/roleMinistry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, RoleGroup, RoleMinistry])],
  exports: [TypeOrmModule],
  providers: [MemberResolver, MemberService],
})
export class MemberModule {}
