'use client';
import * as React from 'react';
import SearchPill from './SearchPill';
import { Item, OwnedItem } from '@/Types';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ItemComponent from './Item';
import styles from '../Styles/ShopStyles.module.css';

type Params = {
	playStyles: { readonly [key: string]: string };
	balance: number[];
	setOwnedItems: React.Dispatch<React.SetStateAction<OwnedItem[]>>;
	ownedItems: OwnedItem[];
	setBalance: React.Dispatch<React.SetStateAction<number[]>>;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const itemsFetched = (url: string) => fetcher(url).then((res) => res.items);

const Shop = React.forwardRef<HTMLInputElement, Params>(
	({ playStyles, balance, setOwnedItems, ownedItems, setBalance }, ref) => {
		const { data, error, isLoading } = useSWR('/api/items', itemsFetched);

		const [search, setSearch] = React.useState<string>('');

		const [filteredItems, setFilteredItems] = React.useState<Item[]>(data);
		React.useEffect(() => {
			setFilteredItems(
				data?.filter(
					(item: Item) =>
						item.name.toLowerCase().includes(search.toLowerCase()) ||
						item.type.toLowerCase().includes(search.toLowerCase())
				)
			);
		}, [search, data]);

		if (isLoading)
			return (
				<section className={`fg ${playStyles.section}`}>
					<SearchPill
						value={''}
						setValue={() => ''}
						placeholder='Search for shop items'
					/>
					<div style={{ display: 'flex' }}>
						<Skeleton
							baseColor='#0e0f12'
							highlightColor='#1a1d21'
							width={88}
							height={88}
						/>
						<Skeleton
							baseColor='#0e0f12'
							highlightColor='#1a1d21'
							width={150}
						/>
					</div>
				</section>
			);
		if (error) return <div>Failed to load</div>;

		return (
			<section
				className={`fg ${playStyles.section} ${styles.itemsContainer} ${styles.overflow}`}
			>
				<SearchPill
					ref={ref}
					value={search}
					setValue={setSearch}
					placeholder='Search for shop items'
				/>
				<div className={`${styles.itemsContainer}`}>
					{filteredItems?.map((item: Item) => (
						<div key={`shop_item_${item.id}`}>
							<ItemComponent
								{...{
									item,
									playStyles,
									type: 'shop',
									balance,
									ownedItems,
									setBalance,
									setOwnedItems,
								}}
							/>
						</div>
					))}
				</div>
			</section>
		);
	}
);

Shop.displayName = 'Shop';

export default Shop;
