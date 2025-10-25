import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Subject } from './subject.entity';
import { CreateSubjectDto, UpdateSubjectDto } from './dtos/subject.dto';
import { Course } from './course.entity';
import { Group } from './group.entity';

@Injectable()
export class SubjectService {
  constructor(private readonly em: EntityManager) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const course = await this.em.findOne(Course, { id: createSubjectDto.courseId });
    if (!course) {
      throw new Error('Course not found');
    }

    const group = await this.em.findOne(Group, { id: createSubjectDto.groupId });
    if (!group) {
      throw new Error('Group not found');
    }

    const subject = this.em.create(Subject, {
      name: createSubjectDto.name,
      course: course,
      group: group,
      description: createSubjectDto.description,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    await this.em.persistAndFlush(subject);
    return subject;
  }

  async findAll(): Promise<any[]> {
    const subjects = await this.em.find(Subject, {}, { populate: ['course', 'group'] });
    // Transform subjects to ensure they have courseId and groupId properties
    return subjects.map(subject => ({
      id: subject.id,
      name: subject.name,
      description: subject.description,
      courseId: subject.course.id,
      groupId: subject.group.id,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt
    }));
  }

  async findOne(id: number): Promise<any | null> {
    const subject = await this.em.findOne(Subject, { id }, { populate: ['course', 'group'] });
    if (subject) {
      // Transform subject to ensure it has courseId and groupId properties
      return {
        id: subject.id,
        name: subject.name,
        description: subject.description,
        courseId: subject.course.id,
        groupId: subject.group.id,
        createdAt: subject.createdAt,
        updatedAt: subject.updatedAt
      };
    }
    return null;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<any | null> {
    const subject = await this.em.findOne(Subject, { id });
    if (!subject) {
      return null;
    }

    if (updateSubjectDto.courseId) {
      const course = await this.em.findOne(Course, { id: updateSubjectDto.courseId });
      if (!course) {
        throw new Error('Course not found');
      }
      subject.course = course;
    }

    if (updateSubjectDto.groupId) {
      const group = await this.em.findOne(Group, { id: updateSubjectDto.groupId });
      if (!group) {
        throw new Error('Group not found');
      }
      subject.group = group;
    }

    this.em.assign(subject, updateSubjectDto);
    subject.updatedAt = new Date();
    await this.em.flush();
    
    // Transform subject to ensure it has courseId and groupId properties
    return {
      id: subject.id,
      name: subject.name,
      description: subject.description,
      courseId: subject.course.id,
      groupId: subject.group.id,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt
    };
  }

  async remove(id: number): Promise<boolean> {
    const subject = await this.em.findOne(Subject, { id });
    if (!subject) {
      return false;
    }

    await this.em.removeAndFlush(subject);
    return true;
  }
}