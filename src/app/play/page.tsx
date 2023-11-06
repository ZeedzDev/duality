'use client';

import * as React from 'react';
import OwnedItems from '@/Components/OwnedItems';
import { Currency, ItemType, OwnedItem } from '@/Types';
import styles from './page.module.css';
import Balance from '@/Components/Balance';
import Shop from '@/Components/Shop';
import Actions from '@/Components/Actions';
import { HotKeys } from 'react-hotkeys';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { coinsContext, ownedItemsContext, pointsContext } from '@/Context';

export default function Play() {
	const [ownedItems, setOwnedItems] = React.useState<OwnedItem[]>([]);
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
				<coinsContext.Provider
					value={{
						coins: balance[0],
						setCoins: (coins) => setBalance([coins, balance[1]]),
					}}
				>
					<pointsContext.Provider
						value={{
							points: balance[1],
							setPoints: (points) => setBalance([balance[0], points]),
						}}
					>
						<ownedItemsContext.Provider
							value={{ items: ownedItems, setOwnedItems }}
						>
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
						</ownedItemsContext.Provider>
					</pointsContext.Provider>
				</coinsContext.Provider>
			</HotKeys>
			<ToastContainer
				position='bottom-left'
				autoClose={5000}
				hideProgressBar={false}
				toastStyle={{
					maxWidth: '480px',
					width: '100%',
					backgroundColor: 'var(--bg-bg-color)',
					color: 'var(--bg-text-color)',
				}}
				closeOnClick
			/>
		</>
	);
}
