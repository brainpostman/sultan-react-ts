import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter basename='sultan-react-ts'>
        <App />
    </BrowserRouter>
);
