import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput, UpdateUserInput } from './dtos';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserInput): Promise<User> {
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

    const existingUser = await this.userRepository.findOneBy({
      username: data.username,
    });

    if (existingUser) {
      throw new Error('User with this username already exists.');
    }
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<User> {
    await this.userRepository.update(id, data);
    return await this.userRepository.findOneBy({ id });
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }
}
