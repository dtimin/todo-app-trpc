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

## Architecture Overview

This application follows a modern full-stack architecture:

### **State Management**
- **Server State**: Managed by tRPC + React Query for data fetching, caching, and synchronization
- **Client State**: Managed by Zustand store for UI state (modals, editing states, filters)

### **Store Structure**
The Zustand store is organized into focused slices:
- **UI State**: Modal open/close states (`createTask`, `editTask`, `createCategory`)
- **Editing State**: Currently editing task/category objects
- **Filter State**: Category filters, search queries, and display preferences

### **Data Flow**
1. **page.tsx** → Initial data fetching via React Query
2. **tRPC** → Type-safe API layer
3. **Prisma** → Database operations
4. **Cache invalidation** → Automatic updates after mutations

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

# Task description

This project is a test assignment to evaluate your skills and familiarity with NextJS 14, TypeScript, Prisma, TRPC, and Zustand. The application will be a full-stack application with both frontend and backend implemented within NextJS. The project is expected to take around 2 days to complete.

## Project Requirements
### 1. NextJS 14 Application
Use NextJS 14 for both the frontend and backend.
Implement the application using TypeScript.
Use a SQL database (preferably PostgreSQL, but others are fine too)
### 2. Frontend
Implement a simple user interface that interacts with the backend via TRPC.
Use Zustand for state management.
Ensure the UI is clean, responsive, and user-friendly.
### 3. Backend
Implement the backend logic within NextJS using API routes.
Use Prisma for database interactions.
Use TRPC for type-safe API calls.
### 4. Data Model
Design a simple data model using Prisma. For instance, a model for managing a list of tasks (to-do list) or user profiles.
### 5. Features
Implement CRUD operations for the chosen data model.
Ensure all CRUD operations are exposed via TRPC endpoints.
```