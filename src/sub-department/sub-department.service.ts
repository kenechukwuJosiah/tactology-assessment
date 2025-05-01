import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
import { Department } from '../department/entities';
import { SubDepartment } from './entities';

@Injectable()
export class SubDepartmentService {
  constructor(
    @InjectRepository(SubDepartment)
    private readonly subDeptRepo: Repository<SubDepartment>,
    @InjectRepository(Department)
    private readonly deptRepo: Repository<Department>,
  ) {}

  async create(
    createSubDepartmentInput: CreateSubDepartmentInput,
  ): Promise<SubDepartment> {
    const { departmentId, name } = createSubDepartmentInput;

    if (!departmentId) {
      throw new Error('Department ID must not be empty');
    }

    const department = await this.deptRepo.findOne({
      where: { id: departmentId },
    });

    if (!department) {
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
      );
    }

    const existingSubDepartment = await this.subDeptRepo.findOne({
      where: { name },
    });

    if (existingSubDepartment) {
      throw new Error(`Sub-department with name "${name}" already exists`);
    }

    const newSubDepartment = this.subDeptRepo.create({
      name,
      department: { id: departmentId },
    });

    return await this.subDeptRepo.save(newSubDepartment);
  }

  async findAll(): Promise<SubDepartment[]> {
    return await this.subDeptRepo.find({ relations: ['department'] });
  }

  async findOne(id: string): Promise<SubDepartment> {
    return await this.subDeptRepo.findOne({
      where: { id },
      relations: ['department'],
    });
  }

  async update(
    id: string,
    updateSubDepartmentInput: UpdateSubDepartmentInput,
  ): Promise<SubDepartment> {
    const { name, departmentId } = updateSubDepartmentInput;

    const subDepartment = await this.subDeptRepo.findOne({ where: { id } });

    if (!subDepartment) {
      throw new NotFoundException(`Sub-department with ID ${id} not found`);
    }

    subDepartment.name = name;
    subDepartment.department = await this.deptRepo.findOne({
      where: { id: departmentId },
    });

    if (!subDepartment.department) {
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
      );
    }

    return await this.subDeptRepo.save(subDepartment);
  }

  async remove(id: number): Promise<boolean> {
    await this.subDeptRepo.delete(id);
    return true;
  }
}
