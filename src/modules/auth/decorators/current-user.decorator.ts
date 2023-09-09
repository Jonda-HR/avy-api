import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { validRoles } from 'src/graphql';
import { User } from 'src/modules/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (role: validRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException('No user inside the request');
    }
    if (role.length === 0) return user;
    if (role.includes(user.roleUser as validRoles)) {
      return user;
    }
    throw new ForbiddenException(`User ${user.userName} need a valid role`);
  },
);
