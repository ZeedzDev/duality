import { Currency, Item, OwnedItem } from '@/Types';
import styles from '../Styles/OwnedItemsStyles.module.css';
import Image from 'next/image';

type Params = {
	item: Item | OwnedItem;
	playStyles: { readonly [key: string]: string };
};

const ItemComponent = ({ item, playStyles }: Params) => {
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
				<button className={`${styles.button} ${styles.sellButton}`}>
					{item.currency === Currency.MONEY
						? process.env.NEXT_PUBLIC_CURRENCY_MONEY
						: process.env.NEXT_PUBLIC_CURRENCY_POINTS}
					{item.sell}
				</button>
				<button className={`${styles.button} ${styles.buyButton}`}>
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
