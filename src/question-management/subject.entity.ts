import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Table } from '../config/entity/base.entity';
import { Course } from './course.entity';
import { Group } from './group.entity';

@Entity({ tableName: 'subject' })
export class Subject extends Table {
  @Property({ length: 128 })
  name: string;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => Group)
  group: Group;

  @Property({ type: 'text', nullable: true })
  description?: string;
}