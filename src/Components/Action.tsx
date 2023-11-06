import { ActionPublic, Currency, Item, OwnedItem } from '@/Types';
import * as React from 'react';
import styles from '../Styles/ActionsStyles.module.css';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
import toast from './Toast';
import { TypeOptions } from 'react-toastify';
import { coinsContext, ownedItemsContext, pointsContext } from '@/Context';
import { addOwnedItem } from '@/Utils';

type Params = {
	action: ActionPublic;
	itemsData?: Item[];
	itemsIsLoading: boolean;
	cooldowns: Map<string, Date>;
	ownedItems: OwnedItem[];
};
const Action = ({ action, itemsData, itemsIsLoading, cooldowns }: Params) => {
	const coins = React.useContext(coinsContext),
		points = React.useContext(pointsContext),
		ownedItems = React.useContext(ownedItemsContext),
		notify = React.useCallback(
			(type: TypeOptions, message: string, title: string) => {
				toast({ type, message, title });
			},
			[]
		),
		cooldown = cooldowns.get(action.id),
		workable =
			(!cooldown || cooldown >= new Date()) &&
			!action.required_items.find(
				(i) => !ownedItems.items.find((it) => it.id === i)
			),
		onAct = async () => {
			const data = await fetch(`/api/actions/${action.category}/${action.id}`, {
				body: JSON.stringify({
					coins: coins.coins,
					inventory: ownedItems.items,
					points: points.points,
				}),
				method: 'POST',
			});
			const res: {
				error?: string;
				code?: number;
				message?: string;
				success?: boolean;
				fail?: boolean;
				newItems?: OwnedItem[];
				points?: number;
				coins?: number;
				loot?: { id: string; quantity: number };
			} = await data.json();
			console.log(res);

			if (res.error)
				return notify(
					'error',
					'There was an error in executing the request',
					action.name
				);

			if (res.success && res.loot) {
				const loot: { id: string; quantity: number } = res.loot;
				let lootItem: Item | undefined;
				let icon = '';
				if (loot.id === Currency.MONEY) {
					icon = process.env.NEXT_PUBLIC_CURRENCY_MONEY || '$';
					coins.setCoins(coins.coins + loot.quantity);
				} else if (loot.id === Currency.POINTS) {
					icon = process.env.NEXT_PUBLIC_CURRENCY_POINTS || '🔥';
					points.setPoints(points.points + loot.quantity);
				} else {
					lootItem = itemsData?.find((i) => i.id === loot.id);
					if (lootItem) {
						if (ownedItems.items.find((i) => i.id === lootItem?.id)) {
							ownedItems.setOwnedItems(
								ownedItems.items.map((i) =>
									i.id === lootItem?.id
										? { ...i, quantity: i.quantity + loot.quantity }
										: i
								)
							);
						} else {
							ownedItems.setOwnedItems([
								...ownedItems.items,
								{ ...lootItem, quantity: loot.quantity },
							]);
						}
					}
				}
				return notify(
					'success',
					res.message?.replaceAll(
						'{loot}',
						`${icon}${loot.quantity}${
							lootItem?.name ? ` ${lootItem.name}` : ''
						}`
					) || 'Yay!',
					action.name
				);
			} else
				return notify(
					res.success ? 'success' : 'error',
					res.message || 'Yes,.',
					action.name
				);

			// if(!res.success && !res.fail) {

			// }
		};

	console.log(`${action.name} is workable: ${workable}`);
	return (
		<div className={`${styles.action}`}>
			<div>
				<h3>{action.name}</h3>
				<p className={`${styles.actionDescription}`}>
					<Arrow />
					{action.description}
				</p>
				<div className={`${styles.actionDescription} ${styles.requires}`}>
					<div>
						<Arrow />
						Requires
					</div>
					<div className={`${styles.requiresItems}`}>
						{itemsIsLoading ? (
							<Skeleton />
						) : (
							action.required_items?.map((item) => {
								const fetchedItem = itemsData?.find((i) => i.id === item);
								if (!fetchedItem)
									return (
										<div
											key={`required_item_${action.id}_${item}`}
											className={`${styles.requiredItem}`}
										>
											<Arrow />
											{item}
										</div>
									);
								return (
									<div
										className={`${styles.requiredItem}`}
										key={`required_item_${action.id}_${item}`}
									>
										<Arrow />
										<div className={`${styles.itemIcon}`}>
											<Image
												src={fetchedItem.iconUrl}
												alt={fetchedItem.name}
												width={25}
												height={25}
											/>
										</div>
										{fetchedItem?.name}
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
			<div className={`${styles.buttonDiv}`}>
				<button
					className={`${styles.button}`}
					disabled={!workable}
					onClick={onAct}
				>
					{action?.category ? action.category[0].toUpperCase() : ''}
					{action?.category?.slice(1)}
				</button>
			</div>
		</div>
	);
};

const Arrow = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='16'
		height='16'
		fill='currentColor'
		className={`bi bi-arrow-return-right ${styles.arrow}`}
		viewBox='0 0 16 16'
	>
		<path
			fillRule='evenodd'
			d='M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z'
		/>
	</svg>
);

export default Action;
