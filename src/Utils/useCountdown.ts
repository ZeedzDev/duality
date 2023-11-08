import * as React from 'react';

export function useCountdown() {
	const [secondsLeft, setSecondsLeft] = React.useState(0);

	React.useEffect(() => {
		if (secondsLeft <= 0) return;

		const timeout = setTimeout(() => {
			setSecondsLeft(secondsLeft - 1);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [secondsLeft]);

	function start(seconds: number) {
		setSecondsLeft(seconds);
	}

	return { secondsLeft, start };
}
