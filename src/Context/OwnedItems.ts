import { OwnedItem } from '@/Types';
import * as React from 'react';

export const ownedItemsContext = React.createContext<{
	items: OwnedItem[];
	setOwnedItems: (items: OwnedItem[]) => void;
}>({ items: [], setOwnedItems: () => {} });
