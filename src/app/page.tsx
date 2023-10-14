import * as React from 'react';
import { Welcome } from '@/Components/Welcome';
import './globals.css';
import styles from './page.module.css';

export default function Home() {
	return (
		<div className='fg'>
			<Welcome />
			<h1>Home Page</h1>
			<h2>Some content</h2>
		</div>
	);
}
