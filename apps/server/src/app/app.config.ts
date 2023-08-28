import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export const appConfig = registerAs('app', () => ({
  app: {
    port: Number(process.env.PORT),
  },
  database: {
    uri: process.env.DB_URI,
  },
  hash: {
    salt: process.env.HASH_SALT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
}));

export const appSchema = Joi.object({
  PORT: Joi.number().optional().default(3000),

  DB_URI: Joi.string().required(),
  HASH_SALT: Joi.number().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.string().optional().default('1000s'),

  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_SECURE: Joi.bool().default(false),
  MAIL_USER: Joi.string().required(),
  MAIL_PASSWORD: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().optional().default(6379),
});
