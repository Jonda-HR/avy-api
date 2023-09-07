import { DataSource } from 'typeorm';
import 'dotenv/config';

const connection = new DataSource({
  type: 'postgres', // Can be any supported database
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PWD),
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true',
  extra: {
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null,
  },
  synchronize: false,
  logging: [process.env.DB_LOGGING === 'true' ? 'query' : null],
  entities: [
    'src/modules/**/*.entity.ts',
    'src/modules/**/entities/*.entity.ts',
  ],
  migrations: ['src/migrations/**/*.ts'],
});

export default connection;
