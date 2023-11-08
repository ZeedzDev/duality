import { ActionGroup as ActionGroupType, Item } from '@/Types';
import * as React from 'react';
import styles from '../Styles/ActionsStyles.module.css';
import Action from './Action';
import { FiltersContext, ownedItemsContext } from '@/Context';

type Params = {
	actionGroup: ActionGroupType;
	search: string;
	itemsData?: Item[];
	itemsIsLoading: boolean;
	cooldowns: Map<string, Date>;
};

const ActionGroupComponent = ({
	actionGroup,
	search,
	itemsData,
	itemsIsLoading,
	cooldowns,
}: Params) => {
	const [collapsed, setCollapsed] = React.useState(true);
	const ownedItems = React.useContext(ownedItemsContext).items;
	const filters = React.useContext(FiltersContext);

	React.useEffect(() => {
		if (search.length || filters.length) setCollapsed(false);
		else setCollapsed(true);
	}, [search, filters]);

	return (
		<div className={`${styles.actionGroup}`}>
			<div
				className={`${styles.actionRow}`}
				onClick={() => setCollapsed(!collapsed)}
			>
				<CollapsibleArrow {...{ collapsed }} />
				<h2>{actionGroup.name}</h2>
			</div>
			<div className={`${styles.actionContainerParent}`}>
				<div
					className={`${styles.actionContainer} ${
						collapsed ? styles.actionsCollapsed : ''
					}`}
				>
					{search.length
						? actionGroup.actions
								.filter((action) => {
									const inSearch =
										action.category?.toLowerCase().includes(search) ||
										action.name.toLowerCase().includes(search.toLowerCase());
									const availableFilterEnabled = filters.includes('available');
									const availableFilter = availableFilterEnabled
										? ownedItems.filter((item) =>
												action.required_items.includes(item.id)
										  ).length === action.required_items.length
										: true;
									if (inSearch && availableFilterEnabled && availableFilter)
										return true;
									if (inSearch && !availableFilterEnabled) return true;
									else return false;
								})
								.map((action) => (
									<div key={`action_${actionGroup.id}_${action.id}`}>
										<Action
											{...{
												action,
												itemsData,
												itemsIsLoading,
												cooldowns,
												ownedItems,
											}}
										/>
									</div>
								))
						: filters.includes('available')
						? actionGroup.actions
								.filter(
									(action) =>
										ownedItems.filter((item) =>
											action.required_items.includes(item.id)
										).length === action.required_items.length
								)
								.map((action) => (
									<div key={`action_${actionGroup.id}_${action.id}`}>
										<Action
											{...{
												action,
												itemsData,
												itemsIsLoading,
												cooldowns,
												ownedItems,
											}}
										/>
									</div>
								))
						: actionGroup.actions.map((action) => (
								<div key={`action_${actionGroup.id}_${action.id}`}>
									<Action
										{...{
											action,
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
		</div>
	);
};

const CollapsibleArrow = ({ collapsed }: { collapsed: boolean }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 20 20'
		fill='currentColor'
		className={`w-5 h-5 ${styles.collapsibleArrow} ${
			collapsed ? styles.arrowCollapsed : ''
		}`}
	>
		<path
			fillRule='evenodd'
			d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
			clipRule='evenodd'
		/>
	</svg>
);

export default ActionGroupComponent;
