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

  async create(input: CreateDepartmentInput, userId: string) {
    const department = this.deptRepo.create({
      name: input.name,
      createdBy: userId,
    });

    const savedDepartment = await this.deptRepo.save(department);

    if (input.subDepartments && input.subDepartments.length > 0) {
      const subDepartments = input.subDepartments.map((subDept) => ({
        name: subDept.name,
        department: savedDepartment,
        createdBy: userId,
      }));

      await this.subDeptRepo.insert(subDepartments);
    }

    return savedDepartment;
  }

  findAll(userId: string) {
    return this.deptRepo.find({
      where: { createdBy: userId },
      relations: ['subDepartments'],
    });
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
