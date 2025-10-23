import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { Table } from 'src/config/entity/base.entity';
import { Permission, Role } from 'src/config/entity/role.entity';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Entity({ schema: '*' })
export class User extends Table {
  // @Property({ default: 'client_default_avatar.png' })
  // avatar?: string = 'client_default_avatar.png';

  @Property({ length: 64 , default: '' })
  firstName: string;

  @Property({ nullable: true })
  lastName?: string;

  @ManyToOne(() => Role)
  role: Role;

  @Enum({ items: () => GenderEnum, nullable: true })
  gender?: GenderEnum;

  // @Property({ length: 64, nullable: true })
  // fatherName?: string;

  // @Property({ length: 64, nullable: true })
  // motherName?: string;

  @Property({ nullable: true, type: 'datetime' })
  dob?: Date;

  @Property({ length: 64, unique: true })
  email: string;

  @Property()
  password: string;

  @Property({ length: 16, default: '' })
  phone: string;
  
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

  // @Property({ length: 64, nullable: true })
  // courseName?: string = '';

  @OneToMany(() => Role, (role) => role.createdBy)
  createdRoles = new Collection<Role>(this);

  @OneToMany(() => Role, (role) => role.deletedBy)
  deletedRoles = new Collection<Role>(this);

  @ManyToMany(() => Permission, (permission) => permission.users, {
    owner: true,
  })
  permissions? = new Collection<Permission>(this);
}
