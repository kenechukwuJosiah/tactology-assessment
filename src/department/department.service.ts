import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities';
import { CreateDepartmentInput } from './dto';
import { SubDepartment } from '../sub-department/entities';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private deptRepo: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDeptRepo: Repository<SubDepartment>,
  ) {}

  async create(input: CreateDepartmentInput, userId: string) {
    const existingDepartment = await this.deptRepo.findOne({
      where: {
        name: input.name,
        createdBy: { id: userId },
      },
    });

    if (existingDepartment) {
      throw new Error('Department with this name already exists.');
    }

    const department = this.deptRepo.create({
      name: input.name,
      createdBy: { id: userId },
    });

    const savedDepartment = await this.deptRepo.save(department);

    if (input.subDepartments?.length) {
      const subDepartments = input.subDepartments.map((sub) =>
        this.subDeptRepo.create({
          name: sub.name,
          department: savedDepartment,
          createdBy: { id: userId },
        }),
      );

      await this.subDeptRepo.save(subDepartments);
    }

    return this.deptRepo.findOne({
      where: { id: savedDepartment.id },
      relations: ['subDepartments'],
    });
  }

  findAll(userId: string) {
    return this.deptRepo.find({
      where: { createdBy: { id: userId } },
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
