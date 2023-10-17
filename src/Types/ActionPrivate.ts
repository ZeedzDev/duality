import { OwnedItem } from '.';
import { ActionPublic } from './ActionPublic';
import { Loot } from './Loot';

type OnActionCallback = ({
	items,
	balance,
}: {
	items: OwnedItem[];
	balance: number[];
}) => { newBalance?: number[]; newItems?: OwnedItem[] };

export type ActionPrivate = {
	success_rate: number;
	fail_rate: number;
	loot: Loot[]; // fixed
	onAction?: OnActionCallback;
} & ActionPublic;
