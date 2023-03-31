import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Catalog from './components/Catalog/Catalog';
import './styles/main.scss';
import Cart from './components/Cart/Cart';
import ItemCard from './components/ItemCard/ItemCard';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/UI/ScrollToTop';
import Login from './components/Admin/Login';

function App() {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="catalog" replace />}
                    />
                    <Route path="catalog/*" element={<Catalog />} />
                    <Route path="catalog/:code" element={<ItemCard />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="login" element={<Login />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
