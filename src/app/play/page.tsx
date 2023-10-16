'use client';

import * as React from 'react';
import OwnedItems from '@/Components/OwnedItems';
import { Currency, ItemType, OwnedItem } from '@/Types';
import styles from './page.module.css';
import Balance from '@/Components/Balance';
import Shop from '@/Components/Shop';
import Actions from '@/Components/Actions';
import { HotKeys } from 'react-hotkeys';

export default function Play() {
	const [ownedItems, setOwnedItems] = React.useState<OwnedItem[]>([
		{
			id: 'rifle',
			name: 'Rifle',
			type: ItemType.EQUIPMENT,
			buy: 700,
			sell: 100,
			currency: Currency.MONEY,
			iconUrl: '/icons/items/rifle.png',
			quantity: 3,
		},
		{
			id: 'shovel',
			name: 'Shovel',
			type: ItemType.EQUIPMENT,
			buy: 150,
			sell: 20,
			currency: Currency.MONEY,
			iconUrl: '/icons/items/shovel.png',
			quantity: 1,
		},
		{
			id: 'fishing_rod',
			name: 'Fishing Rod',
			type: ItemType.EQUIPMENT,
			buy: 400,
			sell: 300,
			currency: Currency.MONEY,
			iconUrl: '/icons/items/fishing_rod.png',
			quantity: 5,
		},
	]);
	const [balance, setBalance] = React.useState<number[]>([10000, 0]);

	const ownedItemsRef = React.useRef<HTMLInputElement>(null);
	const shopRef = React.useRef<HTMLInputElement>(null);
	const actionsRef = React.useRef<HTMLInputElement>(null);

	const keyMap = {
		SEARCH_OWNED_ITEMS: 'ctrl+o',
		SEARCH_SHOP: 'ctrl+s',
		SEARCH_ACTIONS: 'ctrl+a',
	};

	const handlers = {
		SEARCH_OWNED_ITEMS: (e?: KeyboardEvent) => {
			e?.preventDefault();
			ownedItemsRef.current?.focus();
		},
		SEARCH_SHOP: (e?: KeyboardEvent) => {
			e?.preventDefault();
			shopRef.current?.focus();
		},
		SEARCH_ACTIONS: (e?: KeyboardEvent) => {
			e?.preventDefault();
			actionsRef.current?.focus();
		},
	};

	React.useEffect(() => {
		console.log(
			'8888b.  88   88    db    88     88 888888 Yb  dP\n8I  Yb 88   88   dPYb   88     88   88    YbdP\n8I  dY Y8   8P  dP__Yb  88     88   88     8P\n8888Y"  `YbodP' +
				`' dP""""Yb 88ood8 88   88    dP`
		);
	}, []);

	const cooldowns = new Map<string, Date>();

	return (
		<>
			<HotKeys keyMap={keyMap} handlers={handlers} allowChanges>
				<div className={`bg ${styles.playPage}`}>
					<Balance {...{ balance, playStyles: styles }} />
					<OwnedItems
						ref={ownedItemsRef}
						{...{
							ownedItems,
							playStyles: styles,
							balance,
							setOwnedItems,
							setBalance,
						}}
					/>
					<Shop
						ref={shopRef}
						{...{
							playStyles: styles,
							balance,
							setOwnedItems,
							ownedItems,
							setBalance,
						}}
					/>
					<Actions
						ref={actionsRef}
						{...{ playStyles: styles, ownedItems, cooldowns }}
					/>
				</div>
			</HotKeys>
		</>
	);
}
