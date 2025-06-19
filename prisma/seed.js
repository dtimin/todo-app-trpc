import { PrismaClient } from './generated/index.js';

const prisma = new PrismaClient();

async function main() {
	console.log('Starting seed...');

	// Create categories
	const categories = await prisma.category.createMany({
		data: [
			{ id: 1, name: 'Work' },
			{ id: 2, name: 'Personal' },
			{ id: 3, name: 'Shopping' },
		],
		skipDuplicates: true,
	});

	console.log(`Created ${categories.count} categories`);

	// Create tasks
	const tasks = await prisma.task.createMany({
		data: [
			{
				id: 1,
				name: 'Complete project proposal',
				description: 'Finish the proposal for the new client project',
				categoryId: 1, // Work
				createdAt: new Date('2024-01-01T10:00:00Z'),
				updatedAt: new Date('2024-01-01T10:00:00Z'),
			},
			{
				id: 2,
				name: 'Buy groceries',
				description: 'Milk, eggs, bread, and vegetables',
				categoryId: 3, // Shopping
				createdAt: new Date('2024-01-02T14:30:00Z'),
				updatedAt: new Date('2024-01-02T14:30:00Z'),
			},
			{
				id: 3,
				name: 'Schedule dentist appointment',
				description: 'Call Dr. Smith for a checkup',
				categoryId: 2, // Personal
				createdAt: new Date('2024-01-03T09:15:00Z'),
				updatedAt: new Date('2024-01-03T09:15:00Z'),
			},
		],
		skipDuplicates: true,
	});


	// Set PostgreSQL sequences
	await prisma.$executeRaw`SELECT setval('categories_id_seq', 4, false);`;
	await prisma.$executeRaw`SELECT setval('tasks_id_seq', 4, false);`;

	console.log(`Created ${tasks.count} tasks`);
	console.log('🔄 Reset sequences to start from 4');
	console.log('Seed completed successfully!');
}

main()
	.catch((e) => {
		console.error('Seed failed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});