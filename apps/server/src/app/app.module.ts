import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { appConfig, appSchema } from './app.config';
import { ItemModule } from '../item/item.module';
import { AutomapperModule } from '@timonmasberg/automapper-nestjs';
import { pojos } from '@automapper/pojos';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
