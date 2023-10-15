import { Welcome } from '@/Components/Welcome';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Duality - What will your life be?',
	description: 'A game about choices, consequences, and the duality of life.',
	colorScheme: 'dark',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = cookies();
	const welcomedCookieRaw = cookieStore.get('welcomed');
	let cookieWelcomed = true;
	if (welcomedCookieRaw === undefined) cookieWelcomed = false;

	return (
		<html lang='en'>
			<body className={inter.className}>
				<Welcome cookieWelcomed={cookieWelcomed} />
				<div className={`bg pageBg`}>{children}</div>
			</body>
		</html>
	);
}
