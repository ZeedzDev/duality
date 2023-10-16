'use client';
import * as React from 'react';
import styles from '../Styles/ActionsStyles.module.css';
import SearchPill from './SearchPill';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import { ActionGroup, OwnedItem } from '@/Types';
import ActionGroupComponent from './ActionGroup';

type Params = {
	playStyles: {
		readonly [key: string]: string;
	};
	cooldowns: Map<string, Date>;
	ownedItems: OwnedItem[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const actionsFetched = (url: string) => fetcher(url).then((res) => res.actions);
const itemsFetched = (url: string) => fetcher(url).then((res) => res.items);

const Actions = React.forwardRef<HTMLInputElement, Params>(
	({ playStyles, cooldowns, ownedItems }, ref) => {
		const itemsSWR = useSWR(`/api/items`, itemsFetched);
		const itemsData = itemsSWR.data;
		const itemsError = itemsSWR.error;
		const itemsIsLoading = itemsSWR.isLoading;

		const { data, error, isLoading } = useSWR('/api/actions', actionsFetched);

		const [search, setSearch] = React.useState<string>('');

		const [filteredActions, setFilteredActions] =
			React.useState<ActionGroup[]>(data);
		React.useEffect(() => {
			setFilteredActions(
				data?.filter(
					(action: ActionGroup) =>
						action.name.toLowerCase().includes(search.toLowerCase()) ||
						action.actions.filter((action) =>
							action.name.toLowerCase().includes(search.toLowerCase())
						).length
				)
			);
		}, [search, data]);

		if (itemsError)
			return (
				<div>There was an error fetching items (required for actions)</div>
			);

		if (isLoading)
			return (
				<section className={`fg ${playStyles.section}`}>
					<SearchPill
						value={''}
						setValue={() => ''}
						placeholder='Search for actions'
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
			<div
				className={`fg ${playStyles.section} ${styles.actionsContainer} ${styles.overflow}`}
			>
				<SearchPill
					value={search}
					setValue={setSearch}
					placeholder='Search for actions'
					ref={ref}
				/>
				<div className={`${styles.actionsContainer}`}>
					{filteredActions?.map((actionGroup) => (
						<div key={`actions_${actionGroup.id}`}>
							<ActionGroupComponent
								{...{
									actionGroup,
									search,
									itemsData,
									itemsIsLoading,
									cooldowns,
									ownedItems,
								}}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}
);

Actions.displayName = 'Actions';

export default Actions;
