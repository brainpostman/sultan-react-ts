import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import './styles/main.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <BrowserRouter basename='sultan-react-ts'>
            <App />
        </BrowserRouter>
    </Provider>
);
