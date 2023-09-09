import { Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from './CustomError';

export class HandleErrorService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  public handleError = (
    message: string,
    stack?: string,
    context?: string,
  ): never => {
    const errorID = uuidv4();
    this.logger.error({ message, errorID }, stack, context);
    throw new CustomError({ message, errorID, context, stack });
  };
}
