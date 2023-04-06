import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import cl from './Header.module.scss';
import { useEffect, useState } from 'react';
import useMobile from '../../hooks/useMobile';

export default function Header() {
    const { sum, quantity } = useTypedSelector((state) => state.cart);
    const [menuOpen, setMenuOpen] = useState(false);
    const mobile = useMobile(window.matchMedia('(max-width: 1023.99px)'));
    let burgerMenuClasses = `${cl.contacts__container}${menuOpen ? ' ' + cl.menuActive : ''}`;
    let burgerClasses = `${cl.burger}${menuOpen ? ' ' + cl.burger__active : ''}`;
    useEffect(() => {
        const mediaQueryList = window.matchMedia('(max-width: 1499px)');
        function handleWindowResize() {
            if (mediaQueryList.matches) {
                setMenuOpen(false);
            }
        }
        mediaQueryList.addEventListener('change', handleWindowResize);
        return () => {
            mediaQueryList.removeEventListener('change', handleWindowResize);
        };
    }, []);

    return (
        <header className={cl.header}>
            <div className={cl.header__contacts}>
                <div className={burgerMenuClasses}>
                    <div className={cl.contactsInfo}>
                        <div className={cl.contact}>
                            <div className={cl.contact__icon}>
                                <img src='images/header/location.svg' alt='' />
                            </div>
                            <div className={cl.contact__info}>
                                <a href=''>г. Кокчетав, ул. Ж. Ташенова 129Б</a>
                                <p>(Рынок Восточный)</p>
                            </div>
                        </div>
                        <div className={cl.contact}>
                            <div className={cl.contact__icon}>
                                <img src='images/header/mail.svg' alt='' />
                            </div>
                            <div className={cl.contact__info}>
                                <a href=''>opt.sultan@mail.ru</a>
                                <p>На связи в любое время</p>
                            </div>
                        </div>
                        <div className={`${cl.contact} ${cl.inburger}`}>
                            <div className={cl.contact__icon}>
                                <img src='images/header/phone.svg' alt='' />
                            </div>
                            <div className={cl.contact__info}>
                                <a href=''>Отдел продаж</a>
                                <p>
                                    +7 (777) 490-00-91
                                    <br />
                                    время работы: 9:00-20:00
                                </p>
                            </div>
                        </div>
                        <div className={`${cl.contact} ${cl.inburger}`}>
                            <div className={`${cl.contact__icon} ${cl.btn}`}>
                                <img src='images/header/phone_solid.svg' />
                            </div>
                            <div className={cl.contact__info}>
                                <a href=''>Заказать звонок</a>
                            </div>
                        </div>
                    </div>
                    <nav className={cl.menu}>
                        <div className={cl.menu__title}>Меню сайта</div>
                        <ul>
                            <li>
                                <a href=''>О компании</a>
                            </li>
                            <li>
                                <a href=''>Доставка и оплата</a>
                            </li>
                            <li>
                                <a href=''>Возврат</a>
                            </li>
                            <li>
                                <a href=''>Контакты</a>
                            </li>
                        </ul>
                    </nav>
                    <div className={`${cl.utils__pricelist} ${cl.inburger}`}>
                        <button className={cl.btn}>
                            Прайс-лист
                            <img src='images/header/download.svg' alt='' />
                        </button>
                    </div>
                </div>
            </div>
            <div className={cl.header__utils}>
                {!mobile && (
                    <ul className={cl.utils__container}>
                        <li className={cl.utils__column1}>
                            <div
                                className={burgerClasses}
                                onClick={() => {
                                    setMenuOpen((prevValue) => !prevValue);
                                }}>
                                <div>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className={cl.companyLogo}>
                                <Link to='admin'>
                                    <img src='images/header/sultan-logo.svg' alt='СУЛТАН' />
                                </Link>
                            </div>
                            <div className={cl.catalog}>
                                <Link to='catalog'>
                                    <button className={cl.btn}>
                                        Каталог
                                        <img src='images/header/catalog-squares.svg' alt='' />
                                    </button>
                                </Link>
                            </div>
                            <div className={`${cl.input} ${cl.search}`}>
                                <input type='text' placeholder='Поиск...' />
                                <button>
                                    <img src='images/header/search.svg' alt='' />
                                </button>
                            </div>
                            <div className={cl.cart}>
                                <Link to='cart'>
                                    <div className={cl.cart__container}>
                                        <div className={cl.cart__icon}>
                                            <img src='images/header/cart.svg' alt='' />
                                            <div className={cl.cart__items}>
                                                {quantity > 99 ? 99 : quantity}
                                            </div>
                                        </div>

                                        <div className={cl.cart__info}>
                                            <p>Корзина</p>
                                            <p>
                                                {String(sum.toFixed(2))
                                                    .replace(/\./g, ',')
                                                    .replace(/,00/g, '') + ' ₸'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </li>
                        <li className={cl.utils__column2}>
                            <div className={cl.callcenter}>
                                <div className={cl.callcenter__info}>
                                    <a href=''>+7 (777) 490-00-91</a>
                                    <p>время работы: 9:00-20:00</p>
                                    <a href=''>Заказать звонок</a>
                                </div>
                                <div className={cl.callcenter__image}>
                                    <img src='images/header/operator.svg' alt='' />
                                    <div className={cl.callcenter__status}></div>
                                </div>
                            </div>
                            <div className={cl.utils__grayborder}></div>
                            <div className={cl.utils__pricelist}>
                                <button className={cl.btn}>
                                    Прайс-лист
                                    <img src='images/header/download.svg' alt='' />
                                </button>
                            </div>
                            <div className={cl.utils__grayborder}></div>
                            <div className={cl.cart}>
                                <Link to='cart'>
                                    <div className={cl.cart__container}>
                                        <div className={cl.cart__icon}>
                                            <img src='images/header/cart.svg' alt='' />
                                            <div className={cl.cart__items}>
                                                {quantity > 99 ? 99 : quantity}
                                            </div>
                                        </div>
                                        <div className={cl.cart__info}>
                                            <p>Корзина</p>
                                            <p>
                                                {String(sum.toFixed(2))
                                                    .replace(/\./g, ',')
                                                    .replace(/,00/g, '') + ' ₸'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </li>
                    </ul>
                )}
                {mobile && (
                    <div className={cl.mobile}>
                        <div className={cl.mobile__row1}>
                            <div
                                className={burgerClasses}
                                onClick={() => {
                                    setMenuOpen((prevValue) => !prevValue);
                                }}>
                                <div>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className={cl.companyLogo}>
                                <Link to='admin'>
                                    <img src='images/header/sultan-logo.svg' alt='СУЛТАН' />
                                </Link>
                            </div>
                            <div className={cl.cart}>
                                <Link to='cart'>
                                    <div className={cl.cart__container}>
                                        <div className={cl.cart__icon}>
                                            <img src='images/header/cart.svg' alt='' />
                                            <div className={cl.cart__items}>
                                                {quantity > 99 ? 99 : quantity}
                                            </div>
                                        </div>
                                        <div className={cl.cart__info}>
                                            <p>Корзина</p>
                                            <p>
                                                {String(sum.toFixed(2))
                                                    .replace(/\./g, ',')
                                                    .replace(/,00/g, '') + ' ₸'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={cl.mobile__divider}></div>
                        <div className={cl.mobile__row2}>
                            <Link to='catalog' className={cl.mobile__button}>
                                <img src='images/header/search_gray.svg' alt='' /> Поиск
                            </Link>
                            <Link to='catalog' className={cl.mobile__button}>
                                <img src='images/header/catalog_gray.svg' alt='' /> Каталог
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <div
                className={menuOpen ? cl.modal : ''}
                onClick={() => {
                    setMenuOpen(false);
                }}></div>
        </header>
    );
}
