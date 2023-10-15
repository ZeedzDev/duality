import { ActionGroup } from '@/Types/';

export async function GET() {
	return Response.json({ actions });
}

const actions: ActionGroup[] = [
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
			},
			{
				id: 'work_trader',
				name: 'Stocks Trader',
				description: 'Buy low, sell high... right?!',
				category: 'work',
				cooldown: 45,
				required_items: ['economics_degree'],
			},
			{
				id: 'work_primary_school',
				name: 'Primary School Teacher',
				description: 'You must really hate yourself...',
				category: 'work',
				cooldown: 15,
				required_items: ['education_degree_primary'],
			},
			{
				id: 'work_high_school',
				name: 'High School Teacher',
				description: 'You guys just get a bad wrap.',
				category: 'work',
				cooldown: 25,
				required_items: ['education_degree_high'],
			},
			{
				id: 'work_university',
				name: 'University Professor',
				description: 'Woah, smartypants! Tough job market tho... lawyers only!',
				category: 'work',
				cooldown: 39,
				required_items: ['education_degree_university', 'law_degree'],
			},
			{
				id: 'work_developer_startup',
				name: 'Software Developer (at a Startup)',
				description: 'This seems... risky.',
				category: 'work',
				cooldown: 30,
				required_items: ['computer_science_degree'],
			},
			{
				id: 'work_therapist',
				name: 'Therapist',
				description: 'Your ears will run away. Trust me.',
				category: 'work',
				cooldown: 30,
				required_items: ['psychology_degree'],
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
			},
			{
				id: 'fish_speargun',
				name: 'Speargun',
				description: "Woah?! Let's hope you're good...",
				category: 'fish',
				cooldown: 30,
				required_items: ['speargun'],
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
			},
		],
	},
];
