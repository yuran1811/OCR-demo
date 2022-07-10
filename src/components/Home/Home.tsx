import React from 'react';
import { Link } from 'react-router-dom';
import { methods } from '../shared';

const Home = () => {
	return (
		<div className='w-full p-8'>
			<div className='w-full sm:w-[70%] p-8 mx-auto my-6 font-bold text-[5.5rem] text-center text-indigo-800'>
				Welcome to Text recognition
			</div>
			<div className='w-full sm:w-[70%] p-8 mx-auto my-6'>
				<div className='font-semibold text-[3.6rem] text-center'>Method</div>
				<ul className='flex items-center justify-center'>
					{methods.map(({ name, slug }) => (
						<li key={slug} className='m-4'>
							<Link className='p-6 text-[2.4rem] hover:underline underline-offset-8' to={`/${slug}`}>
								{name}
							</Link>
						</li>
					))}
				</ul>

				<div>
					<div>More info:</div>
					<ul>
						<li>
							<a
								href='https://www.smashingmagazine.com/2021/06/image-text-conversion-react-tesseract-js-ocr/'
								target='_blank'
								rel='noopener noreferrer'
							>
								Smashing magazine
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
