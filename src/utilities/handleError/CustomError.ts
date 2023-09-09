interface CustomErrorData {
  errorID: string;
  message: string;
  context?: string;
  stack?: string;
}

export class CustomError extends Error {
  constructor(data: CustomErrorData) {
    super(data.message);
    Object.assign(this, data);
  }
}
