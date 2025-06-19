# Denis Timin Solution - Ve2Max coding assignment

## 🚀 Launching

1. **Start the application**: `npm run docker:run` - Start all containers in detached mode
2. **Set up database**: Run Prisma migrations and seeds using the convenient npm scripts:
- `npm run prisma:migrate` - Create and apply database migrations (run this first)
- `npm run prisma:seed` - Populate database with seed data

3. Run the development server:
```bash
npm run dev
```

## package.json scripts

**Prisma/Database Commands:**
- `npm run prisma:migrate` - Create and apply new migration
- `npm run prisma:reset` - Reset database (drop, recreate, migrate, seed)
- `npm run prisma:seed` - Run seed script to populate database

**Docker Commands:**
- `npm run docker:run` - Start all containers in detached mode
- `npm run docker:stop` - Stop containers
- `npm run docker:restart` - Restart all containers
- `npm run docker:build` - Rebuild containers

**Debugging Commands:**
- `npm run docker:log:app` - View live application logs
- `npm run docker:log:db` - View live database logs

## Additional Prisma Commands (Direct CLI)

For more advanced operations, you can use Prisma CLI directly:
- `prisma generate` - Generate Prisma client based on schema
- `prisma migrate deploy` - Apply pending migrations (production)
- `prisma studio` - Open Prisma Studio (visual database browser)
- `prisma db push` - Push schema changes without creating migration files
- `prisma db pull` - Pull schema from existing database

## How Prisma Seeding Works

Prisma seeding is configured in `package.json` with:
```json
{
   "prisma": {
      "seed": "node prisma/seed.js"
   }
}
```

The seed file (`prisma/seed.js`) contains JavaScript code that uses the Prisma client to insert initial data. Unlike Sequelize seeders that run in sequence, Prisma runs a single seed file that handles all data insertion. The seed script is automatically executed when you run:
- `npm run prisma:seed` (manual seeding)
- `npm run prisma:reset` (includes seeding after reset)
- `npm run prisma:migrate` in development (can include seeding)

## Database Schema

The application uses a simple todo list structure with two main entities:
- **Categories**: Work, Personal, Shopping, etc.
- **Tasks**: Individual todo items linked to categories

Categories can have multiple tasks, but tasks can optionally belong to one category (or none).
