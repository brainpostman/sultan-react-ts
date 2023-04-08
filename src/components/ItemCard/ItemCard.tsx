import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHooks';
import cl from './ItemCard.module.scss';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MyImage from '../UI/MyImage';
import { CatalogItem } from '../../types/catalogItem';
import Back from '../UI/Back/Back';
import useMobile from '../../hooks/useMobile';
import { defaultCareFiltersArr } from '../../utils/createCareFiltersArr';
import { cartSlice } from '../../store/reducers/cartReducer';

const ItemCard = () => {
    const mobile = useMobile(window.matchMedia('(max-width: 1023.99px)'));

    const { code } = useParams();

    const { items: catalogItems } = useAppSelector((state) => state.catalog);
    const { items: cartItems } = useAppSelector((state) => state.cart);
    const item = catalogItems.get(code || '') || new CatalogItem();
    const itemInCart = cartItems.get(item.code);

    const [editingQuantity, setEditingQuantity] = useState(false);
    const [inputValue, setInputValue] = useState(String(itemInCart?.inCart || 0));
    const quantityInputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();
    const { incrementItem, decrementItem, addToCart, changeItemQuantity } = cartSlice.actions;

    const handleIncrementItem = () => {
        if (+inputValue === 0) {
            dispatch(addToCart(item));
        } else {
            dispatch(incrementItem(item.code));
        }
    };
    const handleDecrementItem = () => {
        if (+inputValue > 0) {
            setInputValue((prevValue) => String(+prevValue - 1));
        }
        dispatch(decrementItem(item.code));
    };
    const handleAddItem = () => dispatch(addToCart(item));

    const handleInputFocus = () => {
        setEditingQuantity(true);
        if (itemInCart) setInputValue(String(itemInCart.inCart));
        quantityInputRef.current?.focus();
    };

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Escape' || event.key === 'Tab') {
            setEditingQuantity(false);
        } else if (event.key === 'Enter') {
            handleAcceptInput();
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

    const handleAcceptInput = () => {
        setEditingQuantity(false);
        if (cartItems.has(item.code)) {
            dispatch(changeItemQuantity({ itemCode: item.code, quantity: +inputValue }));
        } else {
            dispatch(addToCart(item));
            dispatch(changeItemQuantity({ itemCode: item.code, quantity: +inputValue }));
        }
    };

    const [descrExpanded, setDescrExpanded] = useState(false);
    const descrExpandRef = useRef<HTMLParagraphElement>(null);
    const [specsExpanded, setSpecsExpanded] = useState(false);
    const specsExpandRef = useRef<HTMLDivElement>(null);

    function handleExpand<T extends HTMLElement>(
        setState: React.Dispatch<React.SetStateAction<boolean>>,
        expandElementRef: React.RefObject<T>
    ) {
        setState((prevValue) => {
            if (expandElementRef.current) {
                if (!prevValue) {
                    expandElementRef.current.style.height =
                        expandElementRef.current.scrollHeight + 'px';
                } else {
                    expandElementRef.current.style.height = '0';
                }
            }
            return !prevValue;
        });
    }

    return (
        <main className={cl.itemcard}>
            <div className={cl.container}>
                {mobile ? (
                    <Back />
                ) : (
                    <Breadcrumbs>
                        <span>
                            <Link to='/catalog'>Каталог</Link>
                        </span>
                        <span>{`${item.brand} ${item.name}`}</span>
                    </Breadcrumbs>
                )}
                <section className={cl.item}>
                    <MyImage src={item.img} containerClass={cl.image} errorClass={cl.imgerror} />
                    <div className={cl.itemInfo}>
                        <p className={cl.instore}>В наличии</p>
                        <h2 className={cl.name}>
                            <strong> {item.brand} </strong> {item.name}
                        </h2>
                        <p className={cl.unit}>
                            {item.unit === 'мл' ? (
                                <img src='images/whh_bottle.svg' />
                            ) : (
                                <img src='images/fa-solid_box-open.svg' />
                            )}
                            <span>
                                {item.amount} {item.unit}
                            </span>
                        </p>
                        <div className={cl.cartControls}>
                            <span className={cl.price}>
                                {String(item.price.toFixed(2))
                                    .replace(/\./g, ',')
                                    .replace(/,00/g, '') + ' ₸'}
                            </span>
                            <div className={cl.quantity}>
                                <button className={cl.changeAmount} onClick={handleDecrementItem}>
                                    -
                                </button>
                                <label htmlFor='cart-quantity' className={cl.incart}>
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
                                        <div onClick={handleInputFocus}>
                                            {itemInCart?.inCart || 0}
                                        </div>
                                    )}
                                </label>
                                <button className={cl.changeAmount} onClick={handleIncrementItem}>
                                    +
                                </button>
                            </div>
                            <button className={`${cl.btn} ${cl.buy}`} onClick={handleAddItem}>
                                В КОРЗИНУ <img src='images/basket.svg' alt='' />
                            </button>
                            {mobile && (
                                <div className={cl.share}>
                                    <img src='images/ci_share.svg' alt='Поделиться' />
                                </div>
                            )}
                        </div>
                        <div className={cl.buttons}>
                            {!mobile && (
                                <div className={cl.share}>
                                    <img src='images/ci_share.svg' alt='Поделиться' />
                                </div>
                            )}
                            <div className={cl.bonus}>
                                <div>
                                    При покупке от <strong>10 000 ₸</strong> бесплатная доставка по
                                    Кокчетаву и области
                                </div>
                            </div>
                            <button className={cl.pricelist}>
                                Прайс-лист
                                <img src='images/download-gray.svg' />
                            </button>
                        </div>
                        <div className={cl.info}>
                            <p>
                                Производитель: <span>{item.mnfct}</span>
                            </p>
                            <p>
                                Бренд: <span>{item.brand}</span>
                            </p>
                            <p>
                                Артикул: <span>{item.code}</span>
                            </p>
                            <p>
                                Штрихкод: <span>{item.code}</span>
                            </p>
                        </div>
                        <div className={cl.description}>
                            <h3 onClick={() => handleExpand(setDescrExpanded, descrExpandRef)}>
                                Описание{' '}
                                <div className={descrExpanded ? cl.arrow_up : cl.arrow_down}></div>
                            </h3>
                            <p ref={descrExpandRef}>{item.descr}</p>
                        </div>

                        <div className={cl.specifications}>
                            <h3 onClick={() => handleExpand(setSpecsExpanded, specsExpandRef)}>
                                Характеристики{' '}
                                <div className={specsExpanded ? cl.arrow_up : cl.arrow_down}></div>
                            </h3>
                            <div className={cl.specifications__container} ref={specsExpandRef}>
                                <p>
                                    Типы ухода:{' '}
                                    <span>
                                        {defaultCareFiltersArr
                                            .filter((filter) => {
                                                return item.types[filter.type];
                                            })
                                            .map((filter) => {
                                                return filter.value.toLowerCase();
                                            })
                                            .join(', ')}
                                    </span>
                                </p>
                                <p>
                                    Назначение: <span>{item.code}</span>
                                </p>
                                <p>
                                    Тип: <span>{item.code}</span>
                                </p>
                                <p>
                                    Производитель: <span>{item.mnfct}</span>
                                </p>
                                <p>
                                    Бренд: <span>{item.brand}</span>
                                </p>
                                <p>
                                    Артикул: <span>{item.code}</span>
                                </p>
                                <p>
                                    Штрихкод: <span>{item.code}</span>
                                </p>
                                <p>
                                    {`${
                                        item.unit === 'мл'
                                            ? 'Объем: '
                                            : item.unit === 'г'
                                            ? 'Вес: '
                                            : 'Количество: '
                                    }`}
                                    <span>
                                        {item.amount} {item.unit}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ItemCard;
