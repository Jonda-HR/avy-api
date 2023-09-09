import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthResponse, SignInInput, SignUpInput } from 'src/graphql';
import { UserService } from '../user/user.service';
import { HandleErrorService } from 'src/utilities/handleError/handleError.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly handleErrorService: HandleErrorService,
  ) {}

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  public async signIn(input: SignInInput): Promise<AuthResponse> {
    const { password, userName } = input;
    const user = await this.userService.userByName(userName);

    if (!bcrypt.compareSync(password, user.password)) {
      this.handleErrorService.handleError('Incorrect password');
    }

    const token = this.getJwtToken(user.id);

    return { user, token };
  }

  public async signUp(input: SignUpInput): Promise<AuthResponse> {
    const user = await this.userService.createUser(input);
    const token = this.getJwtToken(user.id);

    return { user, token };
  }

  public async validateUser(id: string): Promise<User> {
    const user = await this.userService.userById(id);
    delete user.password;
    return user;
  }

  public revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user.id);
    return {
      token,
      user,
    };
  }
}
