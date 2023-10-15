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
			id: '203123',
			name: 'Rifle',
			type: ItemType.EQUIPMENT,
			buy: 700,
			sell: 100,
			currency: Currency.MONEY,
			iconUrl: '/icons/items/rifle.png',
			quantity: 3,
		},
		{
			id: '203122',
			name: 'Shovel',
			type: ItemType.EQUIPMENT,
			buy: 150,
			sell: 20,
			currency: Currency.MONEY,
			iconUrl: '/icons/items/shovel.png',
			quantity: 1,
		},
		{
			id: '203121',
			name: 'Fishing Rod',
			type: ItemType.EQUIPMENT,
			buy: 400,
			sell: 300,
			currency: Currency.MONEY,
			iconUrl: '/icons/items/fishing_rod.png',
			quantity: 5,
		},
	]);
	const [balance, setBalance] = React.useState<number[]>([1000, 0]);

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

	return (
		<>
			<HotKeys keyMap={keyMap} handlers={handlers} allowChanges>
				<div className={`bg ${styles.playPage}`}>
					<Balance {...{ balance, playStyles: styles }} />
					<OwnedItems
						ref={ownedItemsRef}
						{...{ ownedItems, playStyles: styles }}
					/>
					<Shop ref={shopRef} {...{ playStyles: styles }} />
					<Actions ref={actionsRef} {...{ playStyles: styles }} />
				</div>
			</HotKeys>
		</>
	);
}
