import { ActionPublic } from './ActionPublic';
import { Loot } from './Loot';

export type ActionPrivate = {
	success_rate: number;
	fail_rate: number;
	loot: Loot[];
} & ActionPublic;
