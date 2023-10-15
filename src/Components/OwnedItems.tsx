import * as React from 'react';
import { Currency, OwnedItem } from '@/Types/index';
import SearchPill from './SearchPill';
import Image from 'next/image';
import styles from '../Styles/OwnedItemsStyles.module.css';
import ItemComponent from './Item';

type OwnedItemsProps = {
	ownedItems: OwnedItem[];
	playStyles: { readonly [key: string]: string };
};

const OwnedItems = React.forwardRef<HTMLInputElement, OwnedItemsProps>(
	({ ownedItems, playStyles }, ref) => {
		const [search, setSearch] = React.useState<string>('');

		const [filteredItems, setFilteredItems] =
			React.useState<OwnedItem[]>(ownedItems);

		React.useEffect(() => {
			setFilteredItems(
				ownedItems.filter(
					(ownedItem) =>
						ownedItem.name.toLowerCase().includes(search.toLowerCase()) ||
						ownedItem.type.toLowerCase().includes(search.toLowerCase())
				)
			);
		}, [search, ownedItems]);

		return (
			<section
				className={`fg ${playStyles.section} ${styles.ownedItemsContainer}`}
			>
				<SearchPill
					ref={ref}
					{...{
						value: search,
						setValue: setSearch,
						placeholder: 'Search for owned items',
					}}
				/>
				{filteredItems.map((ownedItem) => (
					<div key={`owned_item_${ownedItem.id}`}>
						<ItemComponent {...{ item: ownedItem, playStyles }} />
					</div>
				))}
			</section>
		);
	}
);

OwnedItems.displayName = 'OwnedItems';

export default OwnedItems;
