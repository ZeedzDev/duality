import * as React from 'react';

export const pointsContext = React.createContext<{
	points: number;
	setPoints: (points: number) => void;
}>({ points: 0, setPoints: () => {} });
