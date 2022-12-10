import React from 'react';
import './reset.css';
import PageHeader from './Common/PageHeader';
import { BrowserRouter } from 'react-router-dom';
import PageNavigater from './PageNavigater';
import { Provider } from 'react-redux/es/exports';
import { store } from './store';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<PageHeader />
				<PageNavigater />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
