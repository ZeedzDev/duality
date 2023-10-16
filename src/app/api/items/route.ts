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
		id: "computer_science_degree",
		name: "Computer Science Degree",
		type: ItemType.DEGREE,
		buy: 500,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/computer_science_degree.png',
	},
	{
		id: "economics_degree",
		name: "Economics Degree",
		type: ItemType.DEGREE,
		buy: 900,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: '/icons/items/economics_degree',
	},
	{
		id: "education_degree_high",
		name: "Education Degree (High School)",
		type: ItemType.DEGREE,
		buy: 600,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: "/icons/items/education_degree_high",
	},
	{
		id: "education_degree_primary",
		name: "Education Degree (Primary School)",
		type: ItemType.DEGREE,
		buy: 500,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: "/icons/items/education_degree_primary",
	},
	{
		id: "education_degree_university",
		name: "Education Degree (University Professor)",
		type: ItemType.DEGREE,
		buy: 900,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: "/icons/items/education_degree_university",
	},
	{
		id: "law_degree",
		name: "Law Degree",
		type: ItemType.DEGREE,
		buy: 1000,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: "/icons/items/law_degree",
	},
	{
		id: "psychology_degree",
		name: "Psychology Degree",
		type: ItemType.DEGREE,
		buy: 700,
		sell: 0,
		currency: Currency.MONEY,
		iconUrl: "/icons/items/law_degree",
	}
];
