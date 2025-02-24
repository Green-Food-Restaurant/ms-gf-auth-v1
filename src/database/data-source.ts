import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

// Verifica se as variáveis necessárias estão definidas
if (!process.env.DATABASE_TYPE) {
  throw new Error('DATABASE_TYPE não está definido no ambiente');
}

console.log('process.env.DATABASE_TYPE', process.env.DATABASE_TYPE);
console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);
console.log('process.env.DATABASE_HOST', process.env.DATABASE_HOST);
console.log('process.env.DATABASE_PORT', process.env.DATABASE_PORT);
console.log('process.env.DATABASE_USERNAME', process.env.DATABASE_USERNAME);
console.log('process.env.DATABASE_PASSWORD', process.env.DATABASE_PASSWORD);
console.log('process.env.DATABASE_NAME', process.env.DATABASE_NAME);


export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  username: process.env.DATABASE_USERNAME || 'admin',
  password: process.env.DATABASE_PASSWORD || 'admin123',
  database: process.env.DATABASE_NAME || 'authentication',
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',

    subscribersDir: 'subscriber',
  },
  extra: {
    // based on https://node-postgres.com/api/pool
    // max connection pool size
    max: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    // Adiciona configuração de retry
    retryAttempts: 5,
    retryDelay: 3000, // 3 segundos
    ssl:
      process.env.DATABASE_SSL_ENABLED === 'true'
        ? {
            rejectUnauthorized:
              process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
            ca: process.env.DATABASE_CA ?? undefined,
            key: process.env.DATABASE_KEY ?? undefined,
            cert: process.env.DATABASE_CERT ?? undefined,
          }
        : undefined,
  },
} as DataSourceOptions);
