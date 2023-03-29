import cl from './Header.module.scss';

export default function Header() {
    return <header className={cl.header}>
        <div className={cl.header__contacts}>
            <div className={cl.contacts__container}>
                <div className={cl.contacts}>
                    <div className={cl.contact}>
                        <div className={cl.contact__icon}>
                            <img src="src\assets\images\header\location.svg" alt="" />
                        </div>
                        <div className={cl.contact__info}>
                            <a href="">г. Кокчетав, ул. Ж. Ташенова 129Б
                            </a>
                            <p>(Рынок Восточный)</p>
                        </div>
                    </div>
                    <div className={cl.contact}>
                        <div className={cl.contact__icon}>
                            <img src="src\assets\images\header\mail.svg" alt="" />
                        </div>
                        <div className={cl.contact__info}>
                            <a href="">opt.sultan@mail.ru
                            </a>
                            <p>На связи в любое время</p>
                        </div>
                    </div>
                </div>
                <nav className={cl.menu}>
                    <ul>
                        <li><a href="">О компании</a></li>
                        <li><a href="">Доставка и оплата</a></li>
                        <li><a href="">Возврат</a></li>
                        <li><a href="">Контакты</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        <div className={cl.header__utils}>
            <ul className={cl.utils__container}>
                <li className={cl.utils__column1}>
                    <div className={cl.companyLogo}>
                        <img src="src\assets\images\header\sultan-logo.svg" alt="СУЛТАН" />
                    </div>
                    <button className={cl.btn}>Каталог<img src="src\assets\images\header\catalog-squares.svg" alt="" /></button>
                    <div className={`${cl.input} ${cl.search}`}>
                        <input type="text" placeholder="Поиск..." />
                        <button><img src="src\assets\images\header\search.svg" alt="" /></button>
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
                            <img src="src\assets\images\header\operator.svg" alt="" />
                            <div className={cl.callcenter__status}></div>
                        </div>
                    </div>
                    <div className={cl.pricelist}>
                        <button className={cl.btn}>Прайс-лист<img src="src\assets\images\header\download.svg" alt="" /></button>
                    </div>
                    <div className={cl.cart}>
                        <div className={cl.cart__icon}>
                            <img src="src\assets\images\header\cart.svg" alt="" />
                            <div className={cl.cart__items}>3</div>
                        </div>
                        <div className={cl.cart__info}>
                            <p>Корзина</p>
                            <p>12 478 ₸</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </header>
}
