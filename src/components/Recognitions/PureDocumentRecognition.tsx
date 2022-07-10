import { useCallback, useEffect, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import { preprocessImage } from '../../scripts/preprocessImage';
import { Button } from '../shared';

const PureDocumentRecognition = () => {
	const [text, setText] = useState('');
	const [imagePath, setImagePath] = useState('');
	const [options, setOptions] = useState({
		usePreprocess: false,
	});
	const [progress, setProgress] = useState({
		value: 0,
		status: '',
	});

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	const handleChange = useCallback((e: any) => {
		imagePath && URL.revokeObjectURL(imagePath);
		const imgUrl = URL.createObjectURL(e.target.files[0]);

		setImagePath(imgUrl);
		setText('');
		setProgress({
			value: 0,
			status: '',
		});
	}, []);

	const handleClick = useCallback(() => {
		if (options.usePreprocess && !canvasRef.current) return;
		setText('');

		const dataUrl = options.usePreprocess
			? canvasRef.current
				? canvasRef.current.toDataURL('image/jpeg')
				: imagePath
			: imagePath;
		Tesseract.recognize(dataUrl, 'eng', {
			logger: (m) => {
				setProgress({
					value: m.progress,
					status: m.status,
				});
			},
		})
			.then((resp) => {
				if (!resp) return;

				const { data } = resp as Tesseract.RecognizeResult;
				setText(data.text);
			})
			.catch((err) => {
				console.log('err: ', err);
			});
	}, [imagePath]);

	const ctx = canvasRef.current && canvasRef.current.getContext('2d');

	useEffect(() => {
		if (!options.usePreprocess || !canvasRef.current || !imageRef.current || !ctx) return;

		ctx.drawImage(imageRef.current, 0, 0, 100, (100 * imageRef.current.height) / imageRef.current.width);
		const prep = preprocessImage(canvasRef.current);
		prep && ctx.putImageData(prep, 0, 0);
	}, [imagePath]);

	return (
		<main className='p-8'>
			<div className='w-full flex flex-col items-center justify-start mb-12'>
				<div className='flex items-center justify-start border-indigo-800 border-[0.4rem] rounded-[1rem] mb-8 w-full sm:w-auto'>
					<label className='hidden sm:block cursor-pointer px-4' htmlFor='upload-image'>
						Choose image
					</label>
					<input
						className='cursor-pointer flex-1 w-full p-4 bg-indigo-800 text-indigo-300'
						id='upload-image'
						type='file'
						onChange={handleChange}
					/>
				</div>

				{!!imagePath && (
					<div className='border-[2px] border-indigo-800 p-6'>
						<img ref={imageRef} className='w-full max-w-[50rem]' src={imagePath} />
					</div>
				)}

				{!!imagePath && options.usePreprocess && (
					<div className='border-[2px] border-indigo-800 p-6'>
						<canvas ref={canvasRef} />
					</div>
				)}
			</div>

			<div className='w-full flex flex-col items-center justify-start mb-12'>
				{!!imagePath && (
					<Button className='text-indigo-300 bg-indigo-800 p-6 m-6 rounded-[1rem]' onClick={handleClick}>
						Convert to text
					</Button>
				)}

				{!!progress.status && !text && (
					<div className='w-full max-w-[50rem] p-6'>
						<div className='relative w-full h-[4rem] top-0 left-0 bg-slate-800 rounded-[1.5rem] overflow-hidden'>
							<div
								className='h-full rounded-[1.5rem] bg-teal-600 transition-all'
								style={{ width: `calc(100%*${+progress.value})` }}
							/>
						</div>
						<div className='text-[2.4rem] text-center capitalize p-2'>{progress.status}</div>
					</div>
				)}
			</div>

			{!!text && (
				<div className='w-full flex flex-col items-center justify-start mb-12'>
					<div className='font-bold text-center sm:text-[4rem] p-4'>Result</div>
					<div className='p-6 text-[2.2rem]'>{text}</div>
				</div>
			)}
		</main>
	);
};

export default PureDocumentRecognition;
