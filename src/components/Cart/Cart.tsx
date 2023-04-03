import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { emptyCart } from '../../store/action-creators/cartActions';
import { ICartItem } from '../../types/cartItem';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import List from '../UI/List';
import Modal from '../UI/Modal/Modal';
import cl from './Cart.module.scss';
import CartItem from './CartItem.tsx/CartItem';
import Back from '../UI/Back/Back';

const Cart = () => {
    const { items, sum } = useTypedSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [mobile, setMobile] = useState(false);

    const handleOrder = () => {
        if (sum > 0) {
            setShowModal(true);
            dispatch(emptyCart());
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(max-width: 615px)');
        handleWindowResize();
        function handleWindowResize() {
            if (mediaQueryList.matches) {
                setMobile(true);
            } else {
                setMobile(false);
            }
        }
        mediaQueryList.addEventListener('change', handleWindowResize);
        return () => {
            mediaQueryList.removeEventListener('change', handleWindowResize);
        };
    }, []);

    return (
        <main className={cl.cart}>
            <div className={cl.cart__container}>
                {mobile ? (
                    <Back />
                ) : (
                    <Breadcrumbs>
                        <span>Корзина</span>
                    </Breadcrumbs>
                )}
                <h2 className={cl.cart__title}>КОРЗИНА</h2>
                <List
                    items={Array.from(items.values())}
                    renderItem={(item: ICartItem) => {
                        return <CartItem item={item} key={item.code} />;
                    }}
                    className={cl.cart__list}
                />
                <div className={cl.cart__buy}>
                    <button className={cl.btn} onClick={handleOrder}>
                        Оформить заказ
                    </button>
                    <span className={cl.cart__sum}>
                        {String(sum.toFixed(2))
                            .replace(/\./g, ',')
                            .replace(/,00/g, '') + ' ₸'}
                    </span>
                    {showModal && (
                        <Modal
                            className={cl.modalbg}
                            onClick={() => setShowModal(false)}
                        >
                            <div
                                className={cl.modal}
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div
                                    className={cl.close}
                                    onClick={() => setShowModal(false)}
                                ></div>
                                <div className={cl.modalcheck}>
                                    <img src="images/double-check.svg" />
                                </div>
                                <h3>СПАСИБО ЗА ЗАКАЗ</h3>
                                <p>
                                    Наш менеджер свяжется с вами в ближайшее
                                    время
                                </p>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Cart;
