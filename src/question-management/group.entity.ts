import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Table } from '../config/entity/base.entity';
import { Course } from './course.entity';

@Entity({ tableName: 'group' })
export class Group extends Table {
  @Property({ length: 128 })
  name: string;

  @ManyToOne(() => Course)
  course: Course;

  @Property({ type: 'text', nullable: true })
  description?: string;
}