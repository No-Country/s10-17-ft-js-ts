import { Module } from '@nestjs/common';
import { RedisModule } from '@songkeys/nestjs-redis';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { appConfig } from '../app/app.config';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [appConfig.KEY],
      useFactory: ({ jwt }: ConfigType<typeof appConfig>) => ({
        secret: jwt.secret,
        signOptions: {
          expiresIn: jwt.expires,
        },
      }),
    }),
    RedisModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: ({ redis }: ConfigType<typeof appConfig>) => ({
        config: {
          host: redis.host,
          port: redis.port,
          password: redis.password,
          username: redis.username,
        },
      }),
    }),
    UserModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
