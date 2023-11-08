import * as React from 'react';

export const balanceContext = React.createContext<{
	balance: number[];
	setBalance: (balance: number[]) => void;
}>({ balance: [0, 0], setBalance: () => {} });
