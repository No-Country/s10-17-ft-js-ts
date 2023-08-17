import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export const appConfig = registerAs('app', () => ({
  app: {
    port: process.env.PORT,
  },
  database: {
    uri: process.env.DB_URI,
  },
}));

export const appSchema = Joi.object({
  PORT: Joi.number().optional().default(3000),
  DB_URI: Joi.string().required(),
});
