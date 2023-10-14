import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className={`bg`}>{children}</div>
			</body>
		</html>
	);
}
