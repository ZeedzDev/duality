'use client';

import { TypeOptions, toast } from 'react-toastify';

const ToastMessage = ({
	message,
	type,
	title,
}: {
	title: string;
	message: string;
	type: TypeOptions;
}) =>
	toast(
		<div>
			<h1>{title}</h1>
			<p>{message}</p>
		</div>,
		{
			type,
			autoClose: 5000,
			position: 'bottom-left',
		}
	);

export default ToastMessage;
