'use client';
import * as React from 'react';
import styles from '../Styles/WelcomeStyles.module.css';

export const Welcome = ({ cookieWelcomed }: { cookieWelcomed: boolean }) => {
	const largestWidth = 700;
	const [welcomed, setWelcomed] = React.useState(cookieWelcomed);
	const [width, setWidth] = React.useState(largestWidth);

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			setWidth(window.innerWidth);
		}
	}, [setWidth]);

	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				return setWidth(window.innerWidth);
			};
			if (window) window.addEventListener('resize', handleResize);

			return () => window?.removeEventListener('resize', handleResize);
		}
	}, []);
	if (cookieWelcomed) {
		if (width < largestWidth) return <MobileView />;
		else return <></>;
	}
	if (width >= largestWidth)
		return (
			<div className={`${welcomed ? styles.none : ''} ${styles.container}`}>
				<div className={`fg ${styles.modal} ${welcomed && styles.none_modal}`}>
					<div>
						<h1>👋</h1>
						<h1>Welcome to Duality</h1>
						<h2>What will your life be?</h2>

						<button
							onClick={async () => {
								setWelcomed(true);
								await fetch('/api/welcomed', { method: 'POST' });
								window.location.pathname = '/play';
							}}
						>
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
						<a href='https://dualitygame.notion.site/Quick-Start-Guide-Duality-64e1d0ea2e1f43d485b08496e170ca31'>
							<div>
								<h1>Quick Start Guide</h1>
								<LinkArrow />
							</div>
							<p>{`Get into the game and don't worry about any of the maths powering it`}</p>
						</a>
					</div>
				</div>
			</div>
		);
	else return <MobileView />;
};

const MobileView = () => (
	<div className={`${styles.container}`}>
		<div className={`fg ${styles.modal}`}>
			<div>
				<h1>👋</h1>
				<h1>Welcome to Duality</h1>
				<p>
					Unfortunately, we currently do not support mobile view. Head over to a
					PC and play!
				</p>
			</div>
		</div>
	</div>
);

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
