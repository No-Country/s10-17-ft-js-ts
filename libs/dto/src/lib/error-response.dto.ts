import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    examples: [
      'Invalid email',
      "Verification code doesn't match",
      'Internal server error',
    ],
  })
  message: string;

  @ApiProperty({
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    example: 'BadRequestException',
  })
  error: string;
}
