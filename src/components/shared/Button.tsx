import { FC, HTMLProps } from 'react';

const Button: FC<HTMLProps<HTMLButtonElement>> = ({ children, className, onClick }) => (
	<button className={`${className || ''} p-6 m-6 rounded-[2rem] bg-indigo-800 text-indigo-100`} onClick={onClick}>
		{children}
	</button>
);

export default Button;
