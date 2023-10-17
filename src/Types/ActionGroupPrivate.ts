import { ActionGroup, ActionPrivate } from '.';

export type ActionGroupPrivate = {
	actions: ActionPrivate[];
} & ActionGroup;
