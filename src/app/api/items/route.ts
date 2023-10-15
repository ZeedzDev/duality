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
];
