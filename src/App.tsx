import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Catalog from './components/Catalog/Catalog';
import './styles/main.scss';
import Cart from './components/Cart/Cart';
import ItemCard from './components/ItemCard/ItemCard';
import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/UI/ScrollToTop';
import Admin from './components/Admin/Admin';

function App() {
    return (
        <div className='wrapper'>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path='/' element={<Navigate to='catalog' replace />} />
                <Route path='catalog/*' element={<Catalog />} />
                <Route path='catalog/:code' element={<ItemCard />} />
                <Route path='cart' element={<Cart />} />
                <Route path='*' element={<Navigate to='catalog' replace />} />
                <Route path='admin' element={<Admin />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
