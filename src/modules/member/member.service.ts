import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { CreateMemberInput, UpdateMemberInput } from 'src/graphql';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  public async members(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  public async createMember(input: CreateMemberInput): Promise<Member> {
    const newMember = this.memberRepository.create(input);
    return await this.memberRepository.save(newMember);
  }

  public async memberById(id: number): Promise<Member> {
    return await this.memberRepository.findOneBy({ id });
  }

  public async updateMember(
    id: number,
    input: UpdateMemberInput,
  ): Promise<Member> {
    await this.memberRepository.update(id, input);
    return await this.memberById(id);
  }

  public async removeMember(id: number): Promise<Member> {
    await this.memberRepository.softDelete(id);
    return await this.memberRepository.findOne({
      where: { id },
      withDeleted: true,
    });
  }

  public async restoreMember(id: number): Promise<Member> {
    await this.memberRepository.restore(id);
    return await this.memberById(id);
  }
}
