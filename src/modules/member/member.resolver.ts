import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput, UpdateMemberInput } from 'src/graphql';

@Resolver('Member')
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query('members')
  public async members(): Promise<Member[]> {
    return await this.memberService.members();
  }

  @Query('memberById')
  public async memberById(@Args('id') id: number): Promise<Member> {
    return await this.memberService.memberById(id);
  }

  @Mutation('createMember')
  public async createMember(
    @Args('input') input: CreateMemberInput,
  ): Promise<Member> {
    return await this.memberService.createMember(input);
  }

  @Mutation('updateMember')
  public async updateMember(
    @Args('id') id: number,
    @Args('input') input: UpdateMemberInput,
  ): Promise<Member> {
    return await this.memberService.updateMember(id, input);
  }

  @Mutation('removeMember')
  public async removeMember(@Args('id') id: number): Promise<Member> {
    return await this.memberService.removeMember(id);
  }

  @Mutation('restoreMember')
  public async restoreMember(@Args('id') id: number): Promise<Member> {
    return await this.memberService.restoreMember(id);
  }
}
