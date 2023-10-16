import { Currency, Item, OwnedItem } from '@/Types';
import * as React from 'react';

type Params = {
	item: Item;
	ownedItems: OwnedItem[];
	setOwnedItems: React.Dispatch<React.SetStateAction<OwnedItem[]>>;
	setBalance: React.Dispatch<React.SetStateAction<number[]>>;
	balance: number[];
};

export const sellOwnedItem = ({
	item,
	ownedItems,
	setOwnedItems,
	setBalance,
	balance,
}: Params) => {
	const existingItem = ownedItems.find((i) => i.id === item.id);

	if (!existingItem) return;

	if (existingItem.quantity <= 1) {
		setOwnedItems(ownedItems.filter((i) => i.id !== item.id));
		return addSell({ item, balance, setBalance });
	} else {
		setOwnedItems(
			ownedItems.map((i) =>
				i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
			)
		);
		return addSell({ item, balance, setBalance });
	}
};

const addSell = ({
	item,
	balance,
	setBalance,
}: {
	item: Item;
	balance: number[];
	setBalance: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
	if (item.currency === Currency.MONEY)
		return setBalance([balance[0] + item.sell, balance[1]]);
	else if (item.currency === Currency.POINTS)
		return setBalance([balance[0], balance[1] + item.sell]);
};
