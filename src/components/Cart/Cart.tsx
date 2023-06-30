import { useMemo, useState } from 'react';
import { ICartItem } from '../../types/cartItem';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import List from '../UI/List';
import Modal from '../UI/Modal/Modal';
import cl from './Cart.module.scss';
import CartItem from './CartItem/CartItem';
import Back from '../UI/Back/Back';
import useMobile from '../../hooks/useMobile';
import cartStore, { emptyCart } from '../../store/cartStore';
import { observer } from 'mobx-react-lite';

const Cart = observer(() => {
    const [showModal, setShowModal] = useState(false);
    const mobile = useMobile(window.matchMedia('(max-width: 615px)'));

    const handleOrder = () => {
        if (cartStore.sum > 0) {
            setShowModal(true);
            emptyCart();
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

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
                <h1 className={cl.cart__title}>КОРЗИНА</h1>
                <List
                    items={cartStore.cartArr}
                    renderItem={(item: ICartItem) => {
                        return <CartItem item={item} key={item.code} />;
                    }}
                    className={cl.cart__list}
                />
                <div className={cl.cart__buy}>
                    <button className={cl.btn} onClick={handleOrder} data-testid='handle-order'>
                        Оформить заказ
                    </button>
                    <span className={cl.cart__sum}>
                        {String(cartStore.sum.toFixed(2)).replace(/\./g, ',').replace(/,00/g, '') +
                            ' ₸'}
                    </span>
                    {showModal && (
                        <Modal className={cl.modalbg} onClick={() => setShowModal(false)}>
                            <div className={cl.modal} onClick={(event) => event.stopPropagation()}>
                                <div className={cl.close} onClick={() => setShowModal(false)}></div>
                                <div className={cl.modalcheck}>
                                    <img src='images/double-check.svg' />
                                </div>
                                <h3>СПАСИБО ЗА ЗАКАЗ</h3>
                                <p>Наш менеджер свяжется с вами в ближайшее время</p>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </main>
    );
});

export default Cart;
