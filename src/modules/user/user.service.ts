import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput } from 'src/graphql';
import { HandleErrorService } from 'src/utilities/handleError/handleError.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  public async users(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        order: { userName: 'ASC' },
      });
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while getting the users',
        error.stack,
        'UserService/users',
      );
    }
  }

  public async createUser(input: CreateUserInput): Promise<User> {
    try {
      const newUser = this.userRepository.create({
        ...input,
        password: bcrypt.hashSync(input.password, 10),
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleErrorService.handleError(
        'An error occurred while creating a new user',
        error.stack,
        'UserService/createUser',
      );
    }
  }

  public async userById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while getting the user with ID: ${id}`,
        error.stack,
        'UserService/userById',
      );
    }
  }

  public async userByName(userName: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ userName });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while getting the user with name: ${userName}`,
        error.stack,
        'UserService/userById',
      );
    }
  }

  public async updateUser(id: string, input: UpdateUserInput): Promise<User> {
    try {
      await this.userRepository.update(id, input);
      return await this.userById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while updating user with ID: ${id}`,
        error.stack,
        'UserService/updateUser',
      );
    }
  }

  public async removeUser(id: string): Promise<User> {
    try {
      await this.userRepository.softDelete(id);
      return await this.userRepository.findOne({
        where: { id },
        withDeleted: true,
      });
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while removing the user with ID: ${id}`,
        error.stack,
        'UserService/removeUser',
      );
    }
  }

  public async restoreUser(id: string): Promise<User> {
    try {
      await this.userRepository.restore(id);
      return await this.userById(id);
    } catch (error) {
      this.handleErrorService.handleError(
        `An error occurred while restoring the user with ID: ${id}`,
        error.stack,
        'UserService/restoreUser',
      );
    }
  }
}
