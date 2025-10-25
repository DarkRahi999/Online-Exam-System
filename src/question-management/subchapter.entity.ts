import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Table } from '../config/entity/base.entity';
import { Chapter } from './chapter.entity';
import { Course } from './course.entity';
import { Group } from './group.entity';
import { Subject } from './subject.entity';

@Entity({ tableName: 'subchapter' })
export class SubChapter extends Table {
  @Property({ length: 128 })
  name: string;

  @ManyToOne(() => Chapter)
  chapter: Chapter;

  @ManyToOne(() => Course)
  course: Course;

  @ManyToOne(() => Group)
  group: Group;

  @ManyToOne(() => Subject)
  subject: Subject;

  @Property({ type: 'text', nullable: true })
  description?: string;
}