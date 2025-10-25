import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Course } from './course.entity';
import { Group } from './group.entity';
import { Subject } from './subject.entity';
import { Chapter } from './chapter.entity';
import { SubChapter } from './subchapter.entity';
import { Question } from './question.entity';
import { CourseService } from './course.service';
import { GroupService } from './group.service';
import { SubjectService } from './subject.service';
import { ChapterService } from './chapter.service';
import { SubChapterService } from './subchapter.service';
import { QuestionService } from './question.service';
import { CourseController } from './course.controller';
import { GroupController } from './group.controller';
import { SubjectController } from './subject.controller';
import { ChapterController } from './chapter.controller';
import { SubChapterController } from './subchapter.controller';
import { QuestionController } from './question.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Course,
      Group,
      Subject,
      Chapter,
      SubChapter,
      Question,
    ]),
  ],
  controllers: [
    CourseController,
    GroupController,
    SubjectController,
    ChapterController,
    SubChapterController,
    QuestionController,
  ],
  providers: [
    CourseService,
    GroupService,
    SubjectService,
    ChapterService,
    SubChapterService,
    QuestionService,
  ],
  exports: [
    CourseService,
    GroupService,
    SubjectService,
    ChapterService,
    SubChapterService,
    QuestionService,
  ],
})
export class QuestionManagementModule {}