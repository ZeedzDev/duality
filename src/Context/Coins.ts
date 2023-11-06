import * as React from 'react';

export const coinsContext = React.createContext<{
	coins: number;
	setCoins: (coins: number) => void;
}>({ coins: 0, setCoins: () => {} });
