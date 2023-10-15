import { ActionGroup as ActionGroupType, Item } from '@/Types';
import * as React from 'react';
import styles from '../Styles/ActionsStyles.module.css';
import Action from './Action';

type Params = {
	actionGroup: ActionGroupType;
	search: string;
	itemsData?: Item[];
	itemsIsLoading: boolean;
};

const ActionGroupComponent = ({
	actionGroup,
	search,
	itemsData,
	itemsIsLoading,
}: Params) => {
	const [collapsed, setCollapsed] = React.useState(true);

	React.useEffect(() => {
		if (search.length) setCollapsed(false);
		else setCollapsed(true);
	}, [search]);

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
								.filter(
									(action) =>
										action.category?.toLowerCase().includes(search) ||
										action.name.toLowerCase().includes(search.toLowerCase())
								)
								.map((action) => (
									<div key={`action_${actionGroup.id}_${action.id}`}>
										<Action {...{ action, itemsData, itemsIsLoading }} />
									</div>
								))
						: actionGroup.actions.map((action) => (
								<div key={`action_${actionGroup.id}_${action.id}`}>
									<Action {...{ action, itemsData, itemsIsLoading }} />
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
