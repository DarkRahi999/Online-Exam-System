import { Entity, Enum, Property } from '@mikro-orm/core';
import { Table } from '../../config/entity/base.entity';
import { Gender } from '../../utils/enums';
import { UserRole } from '../../utils/enums';

@Entity({ tableName: 'user' })
export class User extends Table {
  @Property({ length: 64, default: '' })
  firstName: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property({ length: 64, unique: true })
  email: string;

  @Property({ hidden: true })
  password: string;

  @Property({ length: 16, default: '', unique: true })
  phone: string;

  @Enum({ items: () => Gender, nullable: true })
  gender?: Gender;

  @Property({ nullable: true, type: 'datetime' })
  dob?: Date;

  @Property({ length: 16, nullable: true })
  religion?: string;

  @Property({ nullable: true })
  localAddress?: string;

  @Property({ length: 32, nullable: true })
  nationality?: string;

  @Property({ nullable: true, length: 3 })
  bloodGroup?: string;

  @Property({ length: 64, nullable: true })
  studentId?: string = '';

  // Added fields referenced in seed file
  @Property({ nullable: true })
  acceptTerms?: boolean;

  // Simple role field instead of complex relationship
  @Enum({ items: () => UserRole, default: UserRole.USER })
  role: UserRole = UserRole.USER;
}