import { ActionPublic, Item } from '@/Types';
import * as React from 'react';
import styles from '../Styles/ActionsStyles.module.css';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';

type Params = {
	action: ActionPublic;
	itemsData?: Item[];
	itemsIsLoading: boolean;
};
const Action = ({ action, itemsData, itemsIsLoading }: Params) => {
	return (
		<div className={`${styles.action}`}>
			<div>
				<h3>{action.name}</h3>
				<p className={`${styles.actionDescription}`}>
					<Arrow />
					{action.description}
				</p>
				<p className={`${styles.actionDescription} ${styles.requires}`}>
					<div>
						<Arrow />
						Requires
					</div>
					<div className={`${styles.requiresItems}`}>
						{itemsIsLoading ? (
							<Skeleton />
						) : (
							action.required_items?.map((item) => {
								console.log(itemsData);
								const fetchedItem = itemsData?.find((i) => i.id === item);
								console.log(fetchedItem);
								if (!fetchedItem)
									return (
										<div className={`${styles.requiredItem}`}>
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
				</p>
			</div>
			<div className={`${styles.buttonDiv}`}>
				<button className={`${styles.button}`}>
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
