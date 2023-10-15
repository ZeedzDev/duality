import { Item } from './Item';

export interface OwnedItem extends Item {
	quantity: number;
}
