import dotenv from 'dotenv';
dotenv.config();

function required(name: string): string {
  const value = process.env[name];

  if (!value || value.trim() === '') {
    throw new Error(`Missing env: ${name}`);
  }

  return value;
}

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export const config = {
  PORT: toNumber(process.env.PORT, 8000),
  JWT_SECRET: required('JWT_SECRET'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  DIRECT_URL: required('DIRECT_URL'),
  DATABASE_URL: required('DATABASE_URL'),
  REDIS_PORT: required('REDIS_PORT'),
  REDIS_PASS: required('REDIS_PASS'),
  REDIS_HOST: required('REDIS_HOST'),
  REDIS_USERNAME: required('REDIS_USERNAME'),
};

export const {
  REDIS_USERNAME,
  REDIS_PASS,
  REDIS_PORT,
  REDIS_HOST,
  PORT,
  JWT_SECRET,
  NODE_ENV,
  DIRECT_URL,
  DATABASE_URL,
} = config;
