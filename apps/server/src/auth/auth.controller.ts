import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto, CreateUserDto, ErrorResponse, LoginDto } from '@dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({
    description: 'Invalid user credentials',
    type: ErrorResponse,
  })
  @HttpCode(200)
  @Post('login')
  login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @ApiCreatedResponse()
  @ApiBadRequestResponse({
    description: 'Invalid user credentials',
    type: ErrorResponse,
  })
  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @ApiOkResponse({ type: AuthResponseDto })
  @ApiBadRequestResponse({
    type: ErrorResponse,
    description: 'Invalid verification code',
  })
  @Post('checkVerificationCode')
  @HttpCode(200)
  checkVerificationCode(
    @Query('email') email: string,
    @Query('code') code: string
  ) {
    return this.authService.checkVerificationCode(email, code);
  }
}
