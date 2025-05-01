import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department, SubDepartment } from './entities';
import { CreateDepartmentInput } from './dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private deptRepo: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDeptRepo: Repository<SubDepartment>,
  ) {}

  async create(input: CreateDepartmentInput) {
    const department = this.deptRepo.create({
      name: input.name,
      subDepartments: input.subDepartments,
    });
    return this.deptRepo.save(department);
  }

  findAll() {
    return this.deptRepo.find({ relations: ['subDepartments'] });
  }

  async update(id: string, name: string) {
    const department = await this.deptRepo.findOneBy({ id });
    department.name = name;
    return this.deptRepo.save(department);
  }

  async delete(id: string) {
    await this.deptRepo.delete(id);
    return true;
  }
}
