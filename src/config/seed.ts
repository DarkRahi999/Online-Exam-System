import mikroOrmConfig from './mikro-orm.config';
import { User } from '../auth/entity/user.entity';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { MikroORM } from '@mikro-orm/postgresql';
import { UserRole } from '../utils/enums';

// Load environment variables
dotenv.config();

// Simple seeding script for development
export async function runSeeding(syncOnly: boolean = false) {
  console.log(syncOnly ? '🔄 Syncing database...' : '🌱 Starting database seeding...');

  // Validate environment variables
  if (!process.env.DATABASE_URL) {
    throw new Error('❌ DATABASE_URL environment variable is required');
  }

  console.log('🔗 Database URL:', process.env.DATABASE_URL?.replace(/\/\/.*:.*@/, '//***:***@'));

  let orm: MikroORM | undefined;

  try {
    // Connect to database
    console.log('📡 Connecting to database...');
    orm = await MikroORM.init(mikroOrmConfig);
    console.log('✅ Database connection established');

    if (syncOnly) {
      // Sync/refresh database schema only
      console.log('🔄 Refreshing database schema...');
      await orm.getSchemaGenerator().dropSchema();
      await orm.getSchemaGenerator().createSchema();
      console.log('✅ Database schema refreshed');
    } else {
      // Full seeding with data
      console.log('🔧 Creating database schema...');
      await orm.getSchemaGenerator().ensureDatabase();
      await orm.getSchemaGenerator().dropSchema();
      await orm.getSchemaGenerator().createSchema();
      
      // Add a delay to ensure schema is fully created
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('✅ Database schema created');

      const em = orm.em.fork();

      // Seed Super Admin ONLY
      let superAdmin = await em.findOne(User, { email: 'superadmin@example.com' });
      if (!superAdmin) {
        const hashedPassword = await bcrypt.hash('SuperAdmin123!', 12);

        superAdmin = em.create(User, {
          email: 'superadmin@example.com',
          phone: '01700000000',
          firstName: 'Super',
          lastName: 'Admin',
          role: UserRole.SUPER_ADMIN,
          password: hashedPassword,
          acceptTerms: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await em.persistAndFlush(superAdmin);
        console.log('✅ Super Admin user created');
      } else {
        console.log('ℹ️ Super Admin user already exists');
      }

      await em.flush();
      console.log('✅ System settings seeding completed');

      console.log('🎉 Database seeding completed successfully!');
      console.log('');
      console.log('📋 Default Users Created:');
      console.log('👤 Super Admin - Email: superadmin@example.com, Password: SuperAdmin123!');
      console.log('');
      console.log('📝 Note: New users will have USER role by default.');
    }

  } catch (error) {
    console.error('❌ Error during seeding:');
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      if (error.message.includes('ECONNREFUSED')) {
        console.error('📛 Database connection refused. Please ensure PostgreSQL is running.');
      } else if (error.message.includes('authentication failed')) {
        console.error('🔑 Database authentication failed. Check your credentials.');
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.error('💾 Database does not exist. Please create the database first.');
      }
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  } finally {
    if (orm) {
      console.log('🔌 Closing database connection...');
      await orm.close();
      console.log('✅ Database connection closed');
    }
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  const syncOnly = process.argv.includes('sync');
  runSeeding(syncOnly)
    .then(() => {
      console.log(syncOnly ? '✅ Database sync completed' : '✅ Seeding script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error(syncOnly ? '❌ Database sync failed:' : '❌ Seeding script failed:', error);
      process.exit(1);
    });
}