'use client';
import * as React from 'react';
import styles from '../Styles/WelcomeStyles.module.css';

export const Welcome = () => {
	const [welcomed, setWelcomed] = React.useState(false);

	return (
		<div className={`${welcomed && styles.none} ${styles.container}`}>
			<div className={`fg ${styles.modal} ${welcomed && styles.none_modal}`}>
				<div>
					<h1>👋</h1>
					<h1>Welcome to Duality</h1>
					<h2>What will your life be?</h2>

					<button onClick={() => setWelcomed(true)}>
						<p>Give it a shot</p> <Arrow />
					</button>
				</div>
				<div className={styles.links}>
					<a href='/wiki'>
						<div>
							<h1>Wiki</h1>
							<LinkArrow />
						</div>
						<p>Learn about the game, how it works, and the tech behind it</p>
					</a>
					<a href='/quick-start'>
						<div>
							<h1>Quick Start Guide</h1>
							<LinkArrow />
						</div>
						<p>{`Get into the game and don't worry about any of the maths powering the game 🤓🤓`}</p>
					</a>
				</div>
			</div>
		</div>
	);
};

const Arrow = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth={1.5}
		stroke='currentColor'
		className={`w-6 h-6 ${styles.arrow}`}
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		/>
	</svg>
);

const LinkArrow = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth={1.5}
		stroke='currentColor'
		className={`w-6 h-6 ${styles.arrow}`}
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
		/>
	</svg>
);
