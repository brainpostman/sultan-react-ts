import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { emptyCart } from '../../store/action-creators/cartActions';
import { ICartItem } from '../../types/cartItem';
import { getLocalImgPath } from '../../utils/catalogLocalStorageUpdate';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import List from '../UI/List';
import Modal from '../UI/Modal/Modal';
import cl from './Cart.module.scss';
import CartItem from './CartItem.tsx/CartItem';

const Cart = () => {
    const { items, sum } = useTypedSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const catalogImgPath = getLocalImgPath();

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

    return (
        <main className={cl.cart}>
            <div className={cl.cart__container}>
                <Breadcrumbs>
                    <span>Корзина</span>
                </Breadcrumbs>
                <h2 className={cl.cart__title}>КОРЗИНА</h2>
                <List
                    items={Array.from(items.values())}
                    renderItem={(item: ICartItem) => {
                        return (
                            <CartItem
                                item={item}
                                imgPath={catalogImgPath}
                                key={item.code}
                            />
                        );
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
                                    <img src="src/assets/images/double-check.svg" />
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
