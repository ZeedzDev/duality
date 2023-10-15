import * as React from 'react';
import styles from '../Styles/BalanceStyles.module.css';

type BalanceParams = {
	balance: number[];
	playStyles: { readonly [key: string]: string };
};

const Balance = ({ balance, playStyles }: BalanceParams) => {
	return (
		<section className={`fg ${playStyles.section} ${styles.balanceContainer}`}>
			<div className={`${styles.balance}`}>
				<h1>Coin Balance</h1>
				<p>{balance[0]}</p>
			</div>
			<div className={`${styles.balance}`}>
				<h1>Point Balance</h1>
				<p>{balance[1]}</p>
			</div>
		</section>
	);
};

export default Balance;
