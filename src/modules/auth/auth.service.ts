import { Injectable } from '@nestjs/common';
import { AuthResponse, SingUpInput } from 'src/graphql';

@Injectable()
export class AuthService {
  public async singIn() {
    return;
  }

  public async singUp(input: SingUpInput): Promise<AuthResponse> {
    console.log(input);
    throw new Error('No esta implementado');
  }

  public async revalidate() {
    return;
  }
}
