import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Course } from './course.entity';
import { CreateCourseDto, UpdateCourseDto } from './dtos/course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly em: EntityManager) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.em.create(Course, {
      name: createCourseDto.name,
      description: createCourseDto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.em.persistAndFlush(course);
    return course;
  }

  async findAll(): Promise<Course[]> {
    return await this.em.find(Course, {});
  }

  async findOne(id: number): Promise<Course | null> {
    return await this.em.findOne(Course, { id });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course | null> {
    const course = await this.em.findOne(Course, { id });
    if (!course) {
      return null;
    }

    this.em.assign(course, updateCourseDto);
    course.updatedAt = new Date();
    await this.em.flush();
    return course;
  }

  async remove(id: number): Promise<boolean> {
    const course = await this.em.findOne(Course, { id });
    if (!course) {
      return false;
    }

    await this.em.removeAndFlush(course);
    return true;
  }
}