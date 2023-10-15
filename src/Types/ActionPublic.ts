export type ActionPublic = {
	id: string;
	name: string;
	iconUrl?: string;
	description?: string;
	cooldown: number; // seconds
	required_items: string[]; // Item ID
	category?: string;
};
