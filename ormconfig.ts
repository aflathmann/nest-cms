import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  username: process.env.DATABASE_USER || 'appuser',
  password: process.env.DATABASE_PASSWORD || 'apppassword',
  database: process.env.DATABASE_NAME || 'appdb',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: [
    // Use .ts in dev, .js in production
    process.env.NODE_ENV === 'production'
      ? 'dist/src/migrations/*.js'
      : 'src/migrations/*.ts',
  ],
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
});
