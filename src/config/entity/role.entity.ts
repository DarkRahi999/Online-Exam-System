//
import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { Table } from './base.entity';
import { User } from 'src/auth/entity/user.entity';

@Entity({ schema: '*' })
export class Permission extends Table {
  @Property({ unique: true, length: 128 })
  key: string;

  @Property({ length: 255 })
  name: string;

  @Property({ length: 255 })
  module: string;

  @Property({ length: 255, nullable: true })
  description?: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles = new Collection<Role>(this);

  @ManyToMany(() => User, (user) => user.permissions)
  users = new Collection<User>(this);
}

@Entity({ schema: '*' })
export class Role extends Table {
  @Property({ unique: true, length: 128 })
  name: string;

  @Property({ type: 'text', nullable: true })
  responsibilities?: string;

  @ManyToOne({ nullable: true, entity: () => User })
  createdBy?: User;

  @ManyToOne({ nullable: true, entity: () => User })
  deletedBy?: User;

  @Property({ type: 'datetime', nullable: true })
  deletedAt?: Date;

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    owner: true,
  })
  permissions = new Collection<Permission>(this);

  @ManyToOne(() => Role, { nullable: true })
  parent?: Role;

  @OneToMany(() => Role, (role) => role.parent)
  children = new Collection<Role>(this);

  @OneToMany(() => User, (user) => user.role)
  users = new Collection<User>(this);
}
