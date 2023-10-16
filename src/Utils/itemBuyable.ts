import { Currency, Item } from '@/Types';

type Params = {
	item: Item;
	balance: number[];
};

export const itemBuyable = ({ item, balance }: Params) =>
	(item.currency === Currency.MONEY && balance[0] >= item.buy) ||
	(item.currency === Currency.POINTS && balance[1] >= item.buy);
