export interface Category {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Task {
	id: number;
	name: string;
	description?: string;
	categoryId?: number; // foreign key to Category
	createdAt: Date;
	updatedAt: Date;
}