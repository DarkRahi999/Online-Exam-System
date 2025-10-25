import * as dotenv from 'dotenv';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from '../auth/entity/user.entity';
import { Setting } from './entity/base.entity';
import { Course } from '../question-management/course.entity';
import { Group } from '../question-management/group.entity';
import { Subject } from '../question-management/subject.entity';
import { Chapter } from '../question-management/chapter.entity';
import { SubChapter } from '../question-management/subchapter.entity';
import { Question } from '../question-management/question.entity';

dotenv.config();

export default defineConfig({
  driver: PostgreSqlDriver,
  clientUrl: process.env.DATABASE_URL,
  entities: [User, Setting, Course, Group, Subject, Chapter, SubChapter, Question],
  debug: false,
  allowGlobalContext: true,
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200,
  },
  driverOptions: {
    connection: {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      ssl: process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('neon.tech') 
        ? { rejectUnauthorized: false } 
        : false,
    },
  },
  migrations: {
    path: './migrations',
    pathTs: './migrations',
  },
});