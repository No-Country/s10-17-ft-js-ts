import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig, appSchema } from './app.config';
import { ItemModule } from '../item/item.module';
import { UserModule } from '../user/user.module';
import { AutomapperModule } from '@timonmasberg/automapper-nestjs';
import { pojos } from '@automapper/pojos';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appSchema,
    }),
    MongooseModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: ({ database }: ConfigType<typeof appConfig>) => ({
        uri: database.uri,
      }),
    }),
    AutomapperModule.forRoot({
      strategyInitializer: pojos(),
    }),
    ItemModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
