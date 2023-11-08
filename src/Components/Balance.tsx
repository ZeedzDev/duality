import { useContext } from 'react';
import styles from '../Styles/BalanceStyles.module.css';
import { balanceContext } from '@/Context';
import { OwnedItem } from '@/Types';

type BalanceParams = {
	playStyles: { readonly [key: string]: string };
	secondsLeft: number;
	start: (seconds: number) => void;
	setOwnedItems: (items: OwnedItem[]) => void;
};

const Balance = ({
	start,
	playStyles,
	secondsLeft,
	setOwnedItems,
}: BalanceParams) => {
	const balance = useContext(balanceContext);
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
		<section className={`fg ${playStyles.section} ${styles.balanceContainer}`}>
			<div className={`${styles.balance}`}>
				<h1>Coin Balance</h1>
				<p>
					{process.env.NEXT_PUBLIC_CURRENCY_MONEY} {balance.balance[0]}
				</p>
			</div>
			<div className={`${styles.balance}`}>
				<h1>Point Balance</h1>
				<p>
					{process.env.NEXT_PUBLIC_CURRENCY_POINTS} {balance.balance[1]}
				</p>
			</div>
			<div>
				{secondsLeft / 60 < 1
					? `${secondsLeft} seconds left`
					: `${Math.floor(secondsLeft / 60)} minute${
							secondsLeft / 60 > 1 ? 's' : ''
					  }, ${
							secondsLeft - Math.floor(secondsLeft / 60) * 60
					  } seconds left`}{' '}
			</div>
			<div>
				<button onClick={onRestart} className={styles.button}>
					Start / Restart
				</button>
			</div>
			<div>
				{secondsLeft > 0 && (
					<button onClick={() => start(0)} className={styles.button}>
						End Early
					</button>
				)}
			</div>
		</section>
	);
};

export default Balance;
