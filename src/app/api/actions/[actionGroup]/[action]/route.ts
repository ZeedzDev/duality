import { ActionGroupPrivate, Currency, OwnedItem } from '@/Types';

const POINTS_MAX_TO_LOSE = 15000;
const COINS_MAX_TO_LOSE = 7000;

type Params = {
	action: string;
	actionGroup: string;
};

export async function POST(req: Request, context: { params: Params }) {
	const body: { coins: number; points: number; inventory: OwnedItem[] } =
		await req.json();
	const A = context.params.action,
		AG = context.params.actionGroup;

	const actionGroup = ActionGroups.find(
		(ACGR) => ACGR.id.toLowerCase() === AG.toLowerCase()
	);

	if (!actionGroup)
		return Response.json({ error: 'Action group not found.' }, { status: 404 });

	const action = actionGroup.actions.find(
		(AC) => AC.id.toLowerCase() === A.toLowerCase()
	);

	if (!action)
		return Response.json({ error: 'Action not found.' }, { status: 404 });

	if (action.onAction) {
		const res = await action.onAction({
			balance: [body.coins, body.points],
			items: body.inventory,
		});
		return Response.json({ code: 200, res }, { status: 200 });
	}

	const fail = Math.random() < action.fail_rate,
		success = Math.random() < action.success_rate;

	if (fail) {
		/* Possible outcomes:
			- Lose one of the 'required items' (low chance) 0.2
			- Lose random amount of points  - 0.3
			- lose random amount of money - 0.3
			- lose all money - 0.1
			- lose all points - 0.1
		*/
		let removedItem: string | undefined;
		const failNumber = Math.random();
		let newItems = body.inventory || [],
			points = body.points,
			coins = body.coins;
		if (failNumber < 0.2) {
			const requiredItems = action.required_items;
			const itemToRemove =
				requiredItems[Math.floor(Math.random() * requiredItems.length)];
			removedItem = itemToRemove;
			// Remove item from user's inventory
			const existingItem = newItems.find((i) => i.id === itemToRemove);
			if (existingItem)
				if (existingItem.quantity <= 1) {
					newItems = newItems.filter((i) => i.id !== itemToRemove);
				} else
					newItems = newItems.map((i) =>
						i.id === itemToRemove ? { ...i, quantity: i.quantity - 1 } : i
					);
		} else if (failNumber < 0.5) {
			const pointsToRemove = Math.floor(
				Math.random() * Math.min(points, POINTS_MAX_TO_LOSE)
			);
			points -= pointsToRemove;
		} else if (failNumber < 0.8) {
			const coinsToRemove = Math.floor(
				Math.random() * Math.min(coins, COINS_MAX_TO_LOSE)
			);
			coins -= coinsToRemove;
		} else if (failNumber < 0.96) {
			coins = 0;
		} else if (failNumber < 1) {
			points = 0;
		}

		return Response.json(
			{
				code: 200,
				message: 'Unlucky, you failed, losing you{lost}.',
				success: false,
				fail: true,
				newItems,
				points,
				coins,
				removedItem,
			},
			{ status: 200 }
		);
	}
	if (success) {
		// Loot is a random loot from the action's loot array, and a random quantity
		const loot = action.loot[Math.floor(Math.random() * action.loot.length)],
			quantity = Math.floor(
				Math.random() * (loot.loot_range[1] - loot.loot_range[0]) +
					loot.loot_range[0]
			),
			lootMessage = 'You earned {loot}!';

		return Response.json(
			{
				code: 200,
				message: lootMessage,
				success: true,
				fail: false,
				loot: {
					id: loot.loot_id,
					quantity,
				},
			},
			{ status: 200 }
		);
	} else {
		return Response.json(
			{
				code: 200,
				message: "Unlucky, you didn't earn anything.",
				success: false,
				fail: false,
			},
			{ status: 200 }
		);
	}
}

const ActionGroups: ActionGroupPrivate[] = [
	{
		id: 'work',
		name: 'Work',
		actions: [
			{
				id: 'work_lawyer',
				name: 'Lawyer',
				description: 'Justice at Any Cost',
				category: 'work',
				cooldown: 60,
				required_items: ['law_degree'],
				success_rate: 0.3,
				fail_rate: 0.4,
				loot: [
					{
						loot_id: Currency.POINTS,
						loot_range: [1000, 7000],
					},
				],
			},
			{
				id: 'work_trader',
				name: 'Stocks Trader',
				description: 'Buy low, sell high... right?!',
				category: 'work',
				cooldown: 45,
				required_items: ['economics_degree'],
				success_rate: 0.2,
				fail_rate: 0.4,
				loot: [
					{
						loot_id: Currency.POINTS,
						loot_range: [3000, 9000],
					},
				],
			},
			{
				id: 'work_primary_school',
				name: 'Primary School Teacher',
				description: 'You must really hate yourself...',
				category: 'work',
				cooldown: 15,
				required_items: ['education_degree_primary'],
				success_rate: 0.98,
				fail_rate: 0.03,
				loot: [
					{
						loot_id: Currency.POINTS,
						loot_range: [500, 800],
					},
				],
			},
			{
				id: 'work_high_school',
				name: 'High School Teacher',
				description: 'You guys just get a bad wrap.',
				category: 'work',
				cooldown: 25,
				required_items: ['education_degree_high'],
				success_rate: 0.85,
				fail_rate: 0.07,
				loot: [
					{
						loot_id: Currency.POINTS,
						loot_range: [700, 1000],
					},
				],
			},
			{
				id: 'work_university',
				name: 'University Professor',
				description: 'Woah, smartypants! Tough job market tho... lawyers only!',
				category: 'work',
				cooldown: 39,
				required_items: ['education_degree_university', 'law_degree'],
				success_rate: 0.7,
				fail_rate: 0.1,
				loot: [
					{
						loot_id: Currency.POINTS,
						loot_range: [3000, 8000],
					},
				],
			},
			{
				id: 'work_developer_startup',
				name: 'Software Developer (at a Startup)',
				description: 'This seems... risky.',
				category: 'work',
				cooldown: 30,
				required_items: ['computer_science_degree'],
				success_rate: 0.6,
				fail_rate: 0.3,
				loot: [
					{
						loot_id: Currency.MONEY,
						loot_range: [1000, 5000],
					},
				],
			},
			{
				id: 'work_therapist',
				name: 'Therapist',
				description: 'Your ears will run away. Trust me.',
				category: 'work',
				cooldown: 30,
				required_items: ['psychology_degree'],
				success_rate: 0.4,
				fail_rate: 0.1,
				loot: [
					{
						loot_id: Currency.POINTS,
						loot_range: [2000, 5000],
					},
				],
			},
		],
	},
	{
		id: 'fish',
		name: 'Fish',
		actions: [
			{
				id: 'fish_fishing_rod',
				name: 'Fishing Rod',
				description: 'Catch some fish with the average joe fishing rod.',
				category: 'fish',
				cooldown: 15,
				required_items: ['fishing_rod'],
				success_rate: 0.6,
				fail_rate: 0.1,
				loot: [
					{
						loot_id: 'basic_fish',
						loot_range: [1, 5],
					},
					{
						loot_id: 'cool_fish',
						loot_range: [1, 4],
					},
					{
						loot_id: 'rare_fish',
						loot_range: [1, 3],
					},
				],
			},
			{
				id: 'fish_speargun',
				name: 'Speargun',
				description: "Woah?! Let's hope you're good...",
				category: 'fish',
				cooldown: 30,
				required_items: ['spear_gun'],
				success_rate: 0.3,
				fail_rate: 0.3,
				loot: [
					{
						loot_id: 'basic_fish',
						loot_range: [2, 6],
					},
					{
						loot_id: 'cool_fish',
						loot_range: [3, 4],
					},
					{
						loot_id: 'rare_fish',
						loot_range: [2, 4],
					},
					{
						loot_id: 'Whale',
						loot_range: [1, 1],
					},
				],
			},
		],
	},
	{
		id: 'hunt',
		name: 'Hunt',
		actions: [
			{
				id: 'hunt_rifle',
				name: 'Rifle',
				description: 'Hunt some animals with a rifle.',
				category: 'hunt',
				cooldown: 30,
				required_items: ['rifle'],
				success_rate: 0.6,
				fail_rate: 0.4,
				loot: [
					{
						loot_id: 'boar',
						loot_range: [1, 3],
					},
				],
			},
		],
	},
	{
		id: 'dig',
		name: 'Dig',
		actions: [
			{
				id: 'dig_shovel',
				name: 'Shovel',
				description: 'Dig for some treasure with a shovel.',
				category: 'dig',
				cooldown: 15,
				required_items: ['shovel'],
				success_rate: 0.6,
				fail_rate: 0.4,
				loot: [
					{
						loot_id: Currency.MONEY,
						loot_range: [50, 1000],
					},
					// {
					// 	loot_id: "mangled_shoe",
					// 	loot_range: [1, 1]
					// }
				],
			},
		],
	},
];
