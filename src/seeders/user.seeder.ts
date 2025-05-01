import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../src/user/entities';

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);

  const existing = await userRepository.findOneBy({ username: 'admin' });

  if (existing) {
    console.log('Seed user already exists');
    return;
  }

  const password = await bcrypt.hash('admin123', 10);

  const user = userRepository.create({
    username: 'admin',
    fullName: 'Administrator',
    password,
    departments: [],
    subDepartments: [],
  });

  await userRepository.save(user);
  console.log('✅ Seeded user created');
  console.info('Login credentials - Username: admin, Password: admin123');
};
