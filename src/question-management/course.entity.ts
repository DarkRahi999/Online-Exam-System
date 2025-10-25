import { Entity, Property } from '@mikro-orm/core';
import { Table } from '../config/entity/base.entity';

@Entity({ tableName: 'course' })
export class Course extends Table {
  @Property({ length: 128 })
  name: string;

  @Property({ type: 'text', nullable: true })
  description?: string;
}