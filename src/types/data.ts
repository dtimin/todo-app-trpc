/// TODO: Make instead a transformation in the tRPC from null to undefined
export interface Category {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	tasks?: Task[] | null;
}

export interface Task {
	id: number;
	name: string;
	description?: string | null;
	categoryId?: number | null; // foreign key to Category
	createdAt: string;
	updatedAt: string;
	category?: Category | null;
}