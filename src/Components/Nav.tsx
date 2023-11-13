'use client';

import { balanceContext } from '@/Context';
import { OwnedItem } from '@/Types';
import * as React from 'react';
import styles from '../Styles/NavStyles.module.css';

type Props = {
	secondsLeft: number;
	start: (seconds: number) => void;
	setOwnedItems: (items: OwnedItem[]) => void;
};

export const Nav = ({ secondsLeft, setOwnedItems, start }: Props) => {
	const balance = React.useContext(balanceContext);
	const onRestart = () => {
		start(
			process.env.NEXT_PUBLIC_COUNTDOWN_SECONDS
				? parseInt(process.env.NEXT_PUBLIC_COUNTDOWN_SECONDS)
				: 60
		);
		console.log(process.env.NEXT_PUBLIC_START_COINS);
		balance.setBalance([
			process.env.NEXT_PUBLIC_START_COINS
				? parseInt(process.env.NEXT_PUBLIC_START_COINS)
				: 0,
			process.env.NEXT_PUBLIC_START_POINTS
				? parseInt(process.env.NEXT_PUBLIC_START_POINTS)
				: 0,
		]);
		setOwnedItems([]);
	};
	return (
		<div className={`${styles.outer_nav}`}>
			<nav className={`${styles.nav}`}>
				<div className={`${styles.row}`}>
					<div className={`${styles.row_secondary}`}>
						<h1>Coins:</h1>
						<p>
							{' '}
							{process.env.NEXT_PUBLIC_CURRENCY_MONEY} {balance.balance[0]}
						</p>
					</div>
					<div className={`${styles.row_secondary}`}>
						<h1>Points:</h1>
						<p>
							{process.env.NEXT_PUBLIC_CURRENCY_POINTS} {balance.balance[1]}
						</p>
					</div>
					<div className={`${styles.row_secondary}`}>
						<p>
							{secondsLeft / 60 < 1
								? `${secondsLeft} seconds left`
								: `${Math.floor(secondsLeft / 60)} minute${
										secondsLeft / 60 > 1 ? 's' : ''
								  }, ${
										secondsLeft - Math.floor(secondsLeft / 60) * 60
								  } seconds left`}{' '}
						</p>
					</div>
				</div>
				<div className={`${styles.row}`}>
					<div className={`${styles.row_secondary}`}>
						<button onClick={onRestart} className={styles.button}>
							Start / Restart
						</button>
					</div>
					<div className={`${styles.row_secondary}`}>
						{secondsLeft > 0 && (
							<button onClick={() => start(0)} className={styles.button}>
								End Early
							</button>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};
