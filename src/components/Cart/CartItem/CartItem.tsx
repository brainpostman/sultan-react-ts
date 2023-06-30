import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ICartItem } from '../../../types/cartItem';
import cl from './CartItem.module.scss';
import MyImage from '../../UI/MyImage';
import {
    incrementItem,
    decrementItem,
    removeFromCart,
    changeItemQuantity,
} from '../../../store/cartStore';
import { observer } from 'mobx-react-lite';

interface CatalogItemProps {
    item: ICartItem;
}

const CartItem = observer(({ item }: CatalogItemProps) => {
    const [editingQuantity, setEditingQuantity] = useState(false);
    const [inputValue, setInputValue] = useState(String(item.inCart));
    const quantityInputRef = useRef<HTMLInputElement>(null);

    const handleInputFocus = () => {
        setEditingQuantity(true);
        setInputValue(String(item.inCart));
        quantityInputRef.current?.focus();
    };

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Escape' || event.key === 'Tab') {
            setEditingQuantity(false);
        } else if (event.key === 'Enter') {
            handleAcceptInput();
        }
    }

    function handleAcceptInput() {
        setEditingQuantity(false);
        changeItemQuantity(item.code, +inputValue);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newInput = +event.target.value;
        if (newInput < 0) {
            setInputValue('0');
            return;
        } else if (newInput > 9999) {
            setInputValue('9999');
            return;
        }
        setInputValue(`${newInput}`);
    };

    return (
        <div className={cl.item}>
            <MyImage
                src={item.img}
                containerClass={cl.item__image}
                errorClass={cl.item__imgerror}
            />
            <div className={cl.item__info}>
                <p className={cl.item__unit}>
                    {item.unit === 'мл' ? (
                        <img src='images/whh_bottle.svg' />
                    ) : (
                        <img src='images/fa-solid_box-open.svg' />
                    )}
                    <span>
                        {item.amount} {item.unit}
                    </span>
                </p>
                <Link to={`/catalog/${item.code}`}>
                    <h3 className={cl.item__title}>
                        {item.brand}{' '}
                        {item.brand.length + item.name.length < 60
                            ? item.name
                            : item.name.slice(0, 60 - item.brand.length).trimEnd() + '...'}
                    </h3>
                </Link>
                <p className={cl.item__description}>{item.descr}</p>
            </div>
            <div className={cl.item__controls}>
                <div className={cl.item__quantity}>
                    <button
                        className={cl.item__changeAmount}
                        onClick={() => decrementItem(item.code)}>
                        -
                    </button>
                    <div className={cl.item__incart}>
                        <label htmlFor='cart-quantity'>
                            {editingQuantity ? (
                                <input
                                    ref={quantityInputRef}
                                    value={inputValue}
                                    type='number'
                                    name='cart-quantity'
                                    id='cart-quantity'
                                    onBlur={handleAcceptInput}
                                    onInput={handleInputChange}
                                    onKeyDown={handleKeyPress}
                                />
                            ) : (
                                <div onClick={handleInputFocus}>{item.inCart}</div>
                            )}
                        </label>
                    </div>
                    <button
                        className={cl.item__changeAmount}
                        onClick={() => incrementItem(item.code)}>
                        +
                    </button>
                </div>
                <div className={cl.item__price}>
                    <span>
                        {String((item.price * item.inCart).toFixed(2))
                            .replace(/\./g, ',')
                            .replace(/,00/g, '') + ' ₸'}
                    </span>
                </div>
                <div className={cl.item__remove}>
                    <button
                        className={`${cl.item__deletebtn} ${cl.btn}`}
                        onClick={() => removeFromCart(item.code)}>
                        <img src='images/trash.svg' alt='Удалить' />
                    </button>
                </div>
            </div>
        </div>
    );
});

export default CartItem;
