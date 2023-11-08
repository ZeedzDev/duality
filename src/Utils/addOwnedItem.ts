import { Currency, Item, OwnedItem } from '@/Types';
import * as React from 'react';
import { itemBuyable } from '.';

type Params = {
	item: Item;
	ownedItems: OwnedItem[];
	setOwnedItems: React.Dispatch<React.SetStateAction<OwnedItem[]>>;
	setBalance: React.Dispatch<React.SetStateAction<number[]>>;
	balance: number[];
};

export const addOwnedItem = ({
	item,
	ownedItems,
	setOwnedItems,
	setBalance,
	balance,
}: Params) => {
	if (!itemBuyable({ item, balance })) return;

	subtractCost({ item, balance, setBalance });

	if (ownedItems.find((i) => i.id === item.id)) {
		return setOwnedItems(
			ownedItems.map((i) =>
				i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
			)
		);
	} else {
		const newOwnedItems = [...ownedItems];
		newOwnedItems.push({
			...item,
			quantity: 1,
		});
		return setOwnedItems(newOwnedItems);
	}
};

const subtractCost = ({
	item,
	balance,
	setBalance,
}: {
	item: Item;
	balance: number[];
	setBalance: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
	if (item.currency === Currency.MONEY)
		setBalance([balance[0] - item.buy, balance[1]]);
	else if (item.currency === Currency.POINTS)
		setBalance([balance[0], balance[1] - item.buy]);
};
