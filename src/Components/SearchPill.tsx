import * as React from 'react';
import styles from '../Styles/SearchPill.module.css';

type SearchPillProps = {
	placeholder: string;
	value?: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
};

const SearchPill = React.forwardRef<HTMLInputElement, SearchPillProps>(
	({ placeholder, value, setValue }, ref) => {
		return (
			<div className={`bg ${styles.pill}`}>
				<input
					ref={ref}
					className={`${styles.input}`}
					placeholder={placeholder}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				></input>
				<SearchIcon />
			</div>
		);
	}
);

SearchPill.displayName = 'SearchPill';

const SearchIcon = () => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		strokeWidth={1.5}
		stroke='currentColor'
		className={`w-6 h-6 ${styles.searchIcon}`}
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
		/>
	</svg>
);

export default SearchPill;
