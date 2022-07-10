import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import RNav from './components/NavBar/RNav';
import { HandwritingRecognition, PureDocumentRecognition } from './components/Recognitions';

const App = () => (
	<div className='App'>
		<RNav />

		<Routes>
			<Route path='/'>
				<Route index element={<Home />} />
				<Route path='handwriting' element={<HandwritingRecognition />} />
				<Route path='puredocument' element={<PureDocumentRecognition />} />
			</Route>
		</Routes>
	</div>
);

export default App;
