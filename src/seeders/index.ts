import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { seedUsers } from './user.seeder';
import { User } from '../../src/user/entities';
import { Department } from '../department/entities';
import { SubDepartment } from '../sub-department/entities';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydb',
  entities: [User, Department, SubDepartment],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Running user seeder...');
    await seedUsers(AppDataSource);
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error seeding database', err);
    process.exit(1);
  });
