import * as React from 'react';
import { Currency, Item, OwnedItem } from '@/Types';
import styles from '../Styles/OwnedItemsStyles.module.css';
import Image from 'next/image';
import { addOwnedItem, itemBuyable, sellOwnedItem } from '@/Utils';

type Params = {
	item: Item | OwnedItem;
	playStyles: { readonly [key: string]: string };
	type: 'owned' | 'shop';
	balance: number[];
	setBalance: React.Dispatch<React.SetStateAction<number[]>>;
	setOwnedItems: React.Dispatch<React.SetStateAction<OwnedItem[]>>;
	ownedItems: OwnedItem[];
};

const ItemComponent = ({
	item,
	playStyles,
	type,
	balance,
	setBalance,
	setOwnedItems,
	ownedItems,
}: Params) => {
	const buyable = itemBuyable({ item, balance });

	const onBuy = () =>
		addOwnedItem({ item, ownedItems, balance, setBalance, setOwnedItems });

	const onSell = () =>
		sellOwnedItem({ item, ownedItems, setOwnedItems, setBalance, balance });

	return (
		<div className={`${styles.ownedItem}`}>
			<div className={`${styles.firstRow}`}>
				<div className={`${styles.itemIconDiv}`}>
					<Image
						className={`${styles.itemIcon}`}
						src={item.iconUrl}
						alt={item.name}
						width={88}
						height={88}
					/>
				</div>
				<div className={`${styles.firstTextSegment}`}>
					<p>
						<span className={`${styles.itemName}`}>{item.name}</span> /{' '}
						{item.type[0].toUpperCase() + item.type.slice(1)}
					</p>
					{'quantity' in item && <p>{item.quantity} owned</p>}
				</div>
			</div>
			<div className={`${styles.buttonGroup}`}>
				{type === 'owned' && (
					<button
						className={`${styles.button} ${styles.sellButton}`}
						onClick={onSell}
					>
						{item.currency === Currency.MONEY
							? process.env.NEXT_PUBLIC_CURRENCY_MONEY
							: process.env.NEXT_PUBLIC_CURRENCY_POINTS}
						{item.sell}
					</button>
				)}
				<button
					disabled={!buyable}
					aria-disabled={!buyable}
					className={`${styles.button} ${styles.buyButton}`}
					onClick={onBuy}
				>
					{item.currency === Currency.MONEY
						? process.env.NEXT_PUBLIC_CURRENCY_MONEY
						: process.env.NEXT_PUBLIC_CURRENCY_POINTS}
					{item.buy}
				</button>
			</div>
		</div>
	);
};

export default ItemComponent;
