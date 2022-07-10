import { useEffect, useRef, useState } from 'react';
import HandwritingConstructor from '../../scripts/handwriting';
import { Button } from '../shared';

let HWCanvas: HandwritingConstructor | null = null;

const HandwritingRecognition = () => {
	const [result, setResult] = useState<string[]>(['No data']);
	const [isInit, setInit] = useState(false);

	const resultRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isInit) return;
		if (HWCanvas && HWCanvas instanceof HandwritingConstructor) return;

		HWCanvas = new HandwritingConstructor('.canvas-render', 4);
		HWCanvas.init();

		HWCanvas.handle.set_Undo_Redo(true, true);
		HWCanvas.handle.setCallBack((data: string[], err: any) => {
			setResult(err ? ['Error on recogniting'] : data);
		});
		setInit(true);

		return () => {
			HWCanvas = null;
		};
	}, []);

	useEffect(() => {
		isInit && resultRef.current && resultRef.current.scrollIntoView({ behavior: 'smooth' });
	}, [result]);

	return (
		<div className='px-8 py-8 md:py-0 flex flex-col md:flex-row items-center md:items-start justify-start md:justify-center'>
			<div className='w-full'>
				<div className='flex flex-wrap items-center justify-center'>
					<Button
						className='!bg-teal-700 !text-teal-200'
						onClick={() => {
							if (!HWCanvas) return;

							setResult(['Loading...']);
							HWCanvas.handle.setOptions('en');
							HWCanvas.recognize();
						}}
					>
						Send
					</Button>

					<Button className='!bg-slate-700 !text-white' onClick={() => HWCanvas && HWCanvas.handle.erase()}>
						Erase
					</Button>
					<Button onClick={() => HWCanvas && HWCanvas.handle.undo()}>Undo</Button>
					<Button onClick={() => HWCanvas && HWCanvas.handle.redo()}>Redo</Button>
				</div>

				<div className='canvas-render flex flex-wrap items-center justify-center p-8 m-6' />
			</div>

			<div ref={resultRef} className='w-full sm:h-full'>
				<div className='font-bold text-[3.5rem] sm:text-[4.5rem] text-center pt-4'>Result</div>
				<div className='w-full sm:w-[60%] max-h-[30rem] sm:max-h-[44rem] sm:h-full mt-12 mx-auto border-t-[4px] border-b-[4px] flex flex-wrap justify-center items-start overflow-x-hidden overflow-y-auto'>
					{result.map((_, idx) => (
						<p key={_} className='text-center sm:text-[3.6rem] m-4'>
							{_} {idx != result.length - 1 ? ',' : ''}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default HandwritingRecognition;
