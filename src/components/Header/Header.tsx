import { Link, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import cl from './Header.module.scss';

export default function Header() {
    const { items, sum, quantity } = useTypedSelector((state) => state.cart);

    return (
        <header className={cl.header}>
            <div className={cl.header__contacts}>
                <div className={cl.contacts__container}>
                    <div className={cl.contacts}>
                        <div className={cl.contact}>
                            <div className={cl.contact__icon}>
                                <img src="images/header/location.svg" alt="" />
                            </div>
                            <div className={cl.contact__info}>
                                <a href="">г. Кокчетав, ул. Ж. Ташенова 129Б</a>
                                <p>(Рынок Восточный)</p>
                            </div>
                        </div>
                        <div className={cl.contact}>
                            <div className={cl.contact__icon}>
                                <img src="images/header/mail.svg" alt="" />
                            </div>
                            <div className={cl.contact__info}>
                                <a href="">opt.sultan@mail.ru</a>
                                <p>На связи в любое время</p>
                            </div>
                        </div>
                    </div>
                    <nav className={cl.menu}>
                        <ul>
                            <li>
                                <a href="">О компании</a>
                            </li>
                            <li>
                                <a href="">Доставка и оплата</a>
                            </li>
                            <li>
                                <a href="">Возврат</a>
                            </li>
                            <li>
                                <a href="">Контакты</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className={cl.header__utils}>
                <ul className={cl.utils__container}>
                    <li className={cl.utils__column1}>
                        <Link to="admin">
                            <div className={cl.companyLogo}>
                                <img
                                    src="images/header/sultan-logo.svg"
                                    alt="СУЛТАН"
                                />
                            </div>
                        </Link>
                        <Link to="catalog">
                            <button className={cl.btn}>
                                Каталог
                                <img
                                    src="images/header/catalog-squares.svg"
                                    alt=""
                                />
                            </button>
                        </Link>
                        <div className={`${cl.input} ${cl.search}`}>
                            <input type="text" placeholder="Поиск..." />
                            <button>
                                <img src="images/header/search.svg" alt="" />
                            </button>
                        </div>
                    </li>
                    <li className={cl.utils__column2}>
                        <div className={cl.callcenter}>
                            <div className={cl.callcenter__info}>
                                <a href="">+7 (777) 490-00-91</a>
                                <p>время работы: 9:00-20:00</p>
                                <a href="">Заказать звонок</a>
                            </div>
                            <div className={cl.callcenter__image}>
                                <img src="images/header/operator.svg" alt="" />
                                <div className={cl.callcenter__status}></div>
                            </div>
                        </div>
                        <div className={cl.pricelist}>
                            <button className={cl.btn}>
                                Прайс-лист
                                <img src="images/header/download.svg" alt="" />
                            </button>
                        </div>
                        <Link to="cart">
                            <div className={cl.cart}>
                                <div className={cl.cart__icon}>
                                    <img src="images/header/cart.svg" alt="" />
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
                    </li>
                </ul>
            </div>
        </header>
    );
}
