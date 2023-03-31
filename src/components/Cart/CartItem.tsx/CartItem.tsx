import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    decrementItem,
    incrementItem,
    removeItem,
    changeItemQuantity,
} from '../../../store/action-creators/cartActions';
import { ICartItem } from '../../../types/cartItem';
import cl from './CartItem.module.scss';

interface CatalogItemProps {
    item: ICartItem;
    imgPath: string;
}

const CartItem = ({ item, imgPath }: CatalogItemProps) => {
    const [imgIsLoaded, setImgIsLoaded] = useState(true);
    const [editingQuantity, setEditingQuantity] = useState(false);
    const [inputValue, setInputValue] = useState(String(item.inCart));
    const quantityInputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const handleIncrementItem = () => dispatch(incrementItem(item.code));
    const handleDecrementItem = () => dispatch(decrementItem(item.code));
    const handleRemoveItem = () => dispatch(removeItem(item.code));

    const handleInputFocus = () => {
        setEditingQuantity(true);
        setInputValue(String(item.inCart));
        quantityInputRef.current?.focus();
        document.addEventListener('keydown', handleNoChangeBlur);
    };

    function handleNoChangeBlur(event: KeyboardEvent) {
        if (event.key === 'Escape' || event.key === 'Tab') {
            setEditingQuantity(false);
            document.removeEventListener('keydown', handleNoChangeBlur);
        }
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
        setInputValue(`${+newInput}`);
    };

    const handleInputBlur = () => {
        setEditingQuantity(false);
        dispatch(changeItemQuantity(item.code, +inputValue));
        document.removeEventListener('keydown', handleNoChangeBlur);
    };

    return (
        <div className={cl.item}>
            <div className={cl.item__image}>
                {imgIsLoaded ? (
                    <img
                        src={`${imgPath}${item.img}`}
                        onLoad={() => {
                            setImgIsLoaded(true);
                        }}
                        onError={() => {
                            setImgIsLoaded(false);
                        }}
                    />
                ) : (
                    <div className={cl.item__imgerror}>
                        Изображение
                        <br />
                        недоступно
                    </div>
                )}
            </div>
            <div className={cl.item__info}>
                <p className={cl.item__unit}>
                    {item.unit === 'мл' ? (
                        <img src="src/assets/images/whh_bottle.svg" />
                    ) : (
                        <img src="src/assets/images/fa-solid_box-open.svg" />
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
                            : item.name
                                  .slice(0, 60 - item.brand.length)
                                  .trimEnd() + '...'}
                    </h3>
                </Link>
                <p className={cl.item__description}>{item.descr}</p>
            </div>
            <div className={cl.item__controls}>
                <div className={cl.item__quantity}>
                    <button
                        className={cl.item__changeAmount}
                        onClick={handleDecrementItem}
                    >
                        -
                    </button>
                    <label htmlFor="cart-quantity" className={cl.item__incart}>
                        {editingQuantity ? (
                            <input
                                ref={quantityInputRef}
                                value={inputValue}
                                type="number"
                                name="cart-quantity"
                                id="cart-quantity"
                                onBlur={handleInputBlur}
                                onInput={handleInputChange}
                            />
                        ) : (
                            <div onClick={handleInputFocus}>{item.inCart}</div>
                        )}
                    </label>
                    <button
                        className={cl.item__changeAmount}
                        onClick={handleIncrementItem}
                    >
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
                        onClick={handleRemoveItem}
                    >
                        <img src="src/assets/images/trash.svg" alt="Удалить" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
