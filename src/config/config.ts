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
};

export const { PORT, JWT_SECRET } = config;
