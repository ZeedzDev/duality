import { Currency } from './Currency';
import { ItemType } from './ItemType';

export type Item = {
	iconUrl: string;
	name: string;
	id: string;
	buy: number;
	sell: number;
	type: ItemType;
	currency: Currency;
};
