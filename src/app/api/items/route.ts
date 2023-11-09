import { Currency, Item, ItemType } from '@/Types';

export async function GET() {
	return Response.json({ items });
}

const items: Item[] = [
	{
		id: 'rifle',
		name: 'Rifle',
		type: ItemType.EQUIPMENT,
		buy: 700,
		sell: 100,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/rifle.png',
	},
	{
		id: 'shovel',
		name: 'Shovel',
		type: ItemType.EQUIPMENT,
		buy: 150,
		sell: 20,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/shovel.png',
	},
	{
		id: 'fishing_rod',
		name: 'Fishing Rod',
		type: ItemType.EQUIPMENT,
		buy: 400,
		sell: 300,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/fishing_rod.png',
	},
	{
		id: 'computer_science_degree',
		name: 'Computer Science Degree',
		type: ItemType.DEGREE,
		buy: 500,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/computer_science_degree.png',
	},
	{
		id: 'economics_degree',
		name: 'Economics Degree',
		type: ItemType.DEGREE,
		buy: 900,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/economics_degree.png',
	},
	{
		id: 'education_degree_high',
		name: 'Education Degree (High School)',
		type: ItemType.DEGREE,
		buy: 600,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/education_degree_high.png',
	},
	{
		id: 'education_degree_primary',
		name: 'Education Degree (Primary School)',
		type: ItemType.DEGREE,
		buy: 500,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/education_degree_primary.png',
	},
	{
		id: 'education_degree_university',
		name: 'Education Degree (University Professor)',
		type: ItemType.DEGREE,
		buy: 900,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/education_degree_university.png',
	},
	{
		id: 'law_degree',
		name: 'Law Degree',
		type: ItemType.DEGREE,
		buy: 1000,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/law_degree.png',
	},
	{
		id: 'psychology_degree',
		name: 'Psychology Degree',
		type: ItemType.DEGREE,
		buy: 700,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/law_degree.png',
	},
	{
		id: 'basic_fish',
		name: 'Basic Fish',
		type: ItemType.COLLECTABLE,
		buy: 0,
		sell: 100,
		currency: Currency.POINTS,
		iconUrl: '/icons/items/basic_fish.png',
	},
	{
		id: 'kyanite_sword',
		name: 'Kyanite Sword',
		type: ItemType.WEAPON,
		buy: 2500,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/kyanite_sword.png',
	},
	{
		id: 'nunchucks',
		name: 'Nunchucks',
		type: ItemType.WEAPON,
		buy: 900,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/nunchucks.png',
	},
	{
		id: 'rare_fish',
		name: 'Rare Fish',
		type: ItemType.COLLECTABLE,
		buy: 0,
		sell: 300,
		currency: Currency.POINTS,
		iconUrl: '/icons/items/rare_fish.png',
	},
	{
		id: 'ruby_sword',
		name: 'Ruby Sword',
		type: ItemType.WEAPON,
		buy: 3000,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/ruby_sword.png',
	},
	{
		id: 'sai',
		name: 'Sai',
		type: ItemType.WEAPON,
		buy: 800,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/sai.png',
	},
	{
		id: 'spear_gun',
		name: 'Spear Gun',
		type: ItemType.EQUIPMENT,
		buy: 1500,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/spear_gun.png',
	},
	{
		id: 'cool_fish',
		name: 'Cool Fish',
		type: ItemType.COLLECTABLE,
		buy: 0,
		sell: 200,
		currency: Currency.POINTS,
		iconUrl: '/icons/items/cool_fish.png',
	},
	{
		id: 'whale',
		name: 'Whale',
		type: ItemType.COLLECTABLE,
		buy: 0,
		sell: 1000,
		currency: Currency.POINTS,
		iconUrl: '/icons/items/whale.png',
	},
];
