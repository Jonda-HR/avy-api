import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { CreateMemberInput, UpdateMemberInput } from 'src/graphql';
import { HandleErrorService } from 'src/utilities/handleError/handleError.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  public async members(): Promise<Member[]> {
    try {
      return await this.memberRepository.find({
        order: { firstName: 'ASC' },
      });
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while getting the members',
        error.stack,
        'MemberService/members',
      );
    }
  }

  public async createMember(input: CreateMemberInput): Promise<Member> {
    try {
      const newMember = this.memberRepository.create(input);
      return await this.memberRepository.save(newMember);
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while creating a new Member',
        error.stack,
        'MemberService/createMember',
      );
    }
  }

  public async memberById(id: number): Promise<Member> {
    try {
      return await this.memberRepository.findOneBy({ id });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while getting the member with ID: ${id}`,
        error.stack,
        'MemberService/memberById',
      );
    }
  }

  public async updateMember(
    id: number,
    input: UpdateMemberInput,
  ): Promise<Member> {
    try {
      await this.memberRepository.update(id, input);
      return await this.memberById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while updating member with ID: ${id}`,
        error.stack,
        'MemberService/updateMember',
      );
    }
  }

  public async removeMember(id: number): Promise<Member> {
    try {
      await this.memberRepository.softDelete(id);
      return await this.memberRepository.findOne({
        where: { id },
        withDeleted: true,
      });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while removing the member with ID: ${id}`,
        error.stack,
        'MemberService/removeMember',
      );
    }
  }

  public async restoreMember(id: number): Promise<Member> {
    try {
      await this.memberRepository.restore(id);
      return await this.memberById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while restoring the member with ID: ${id}`,
        error.stack,
        'MemberService/restoreMember',
      );
    }
  }
}
