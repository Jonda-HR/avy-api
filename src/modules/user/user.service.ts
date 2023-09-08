import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput } from 'src/graphql';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async users(): Promise<User[]> {
    return await this.userRepository.find({
      order: { userName: 'ASC' },
    });
  }

  public async createUser(input: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(input);
    return await this.userRepository.save(newUser);
  }

  public async userById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async updateUser(id: number, input: UpdateUserInput): Promise<User> {
    await this.userRepository.update(id, input);
    return await this.userById(id);
  }

  public async removeUser(id: number): Promise<User> {
    await this.userRepository.softDelete(id);
    return await this.userRepository.findOne({
      where: { id },
      withDeleted: true,
    });
  }

  public async restoreUser(id: number): Promise<User> {
    await this.userRepository.restore(id);
    return await this.userById(id);
  }
}
