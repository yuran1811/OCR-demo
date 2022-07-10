import { NavLink } from 'react-router-dom';
import { methods } from '../shared';

const RNav = () => (
	<div className='z-[100] sticky top-0 left-0 w-full bg-white border-b-[2px] border-b-indigo-800 p-4 flex flex-wrap items-center justify-start'>
		<NavLink
			to='/'
			className={({ isActive }) =>
				`w-full sm:w-auto font-semibold text-center p-4 mx-4 text-indigo-800 ${
					isActive ? 'underline underline-offset-8' : ''
				}`
			}
		>
			Home
		</NavLink>

		{methods.map(({ name, slug }) => (
			<NavLink
				key={slug}
				to={`/${slug}`}
				className={({ isActive }) =>
					`w-full sm:w-auto font-semibold text-center p-4 mx-4 text-indigo-800 ${
						isActive ? 'underline underline-offset-8' : ''
					}`
				}
			>
				{name}
			</NavLink>
		))}
	</div>
);

export default RNav;
