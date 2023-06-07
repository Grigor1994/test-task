import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidResponseDataException extends HttpException {
  constructor() {
    super(
      'Error retrieving daily stock data: Invalid response data',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
