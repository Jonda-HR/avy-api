import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthResponse, SignInInput, SignUpInput } from 'src/graphql';
import { UserService } from '../user/user.service';
import { HandleErrorService } from 'src/utilities/handleError/handleError.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly handleErroService: HandleErrorService,
  ) {}

  public async signIn(input: SignInInput): Promise<AuthResponse> {
    const { password, userName } = input;
    const user = await this.userService.userByName(userName);

    if (!bcrypt.compareSync(password, user.password)) {
      this.handleErroService.handleError('Incorrect password');
    }
    const token = '123456789';
    return { user, token };
  }

  public async signUp(input: SignUpInput): Promise<AuthResponse> {
    const user = await this.userService.createUser(input);
    const token = '123456789';

    return { user, token };
  }

  public async revalidate() {
    return;
  }
}
