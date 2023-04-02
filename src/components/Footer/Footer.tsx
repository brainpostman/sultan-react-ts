import cl from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={cl.footer}>
            <div className={cl.footer__container}>
                <div className={cl.subscription}>
                    <div className={cl.subscription__toprow}>
                        <div className={cl.subscription__logo}>
                            <img src="images/footer/sultan.svg" alt="СУЛТАН" />
                        </div>
                        <button className={cl.btn}>
                            Прайс-лист
                            <img src="images/header/download.svg" alt="" />
                        </button>
                    </div>
                    <p>
                        Компания «Султан» — снабжаем розничные магазины товарами
                        &quot;под ключ&quot; в Кокчетаве и Акмолинской области
                    </p>
                    <form id="email-sub" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="email-sub">
                            Подпишись на скидки и акции
                        </label>
                        <div
                            className={`${cl.input} ${cl.subscription__input}`}
                        >
                            <input
                                type="email"
                                name="email-sub"
                                placeholder="Введите ваш E-mail"
                            />
                            <button form="email-sub" type="submit">
                                <img src="images/footer/arrow.svg" alt="" />
                            </button>
                        </div>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <h4>Меню сайта:</h4>
                        </li>
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
                <nav>
                    <ul>
                        <li>
                            {' '}
                            <h4>Категории:</h4>
                        </li>
                        <li>
                            <a href="">Бытовая химия</a>
                        </li>
                        <li>
                            <a href="">Косметика и гигиена</a>
                        </li>
                        <li>
                            <a href="">Товары для дома</a>
                        </li>
                        <li>
                            <a href="">Товары для детей и мам</a>
                        </li>
                        <li>
                            <a href="">Посуда</a>
                        </li>
                    </ul>
                </nav>
                <div className={cl.info}>
                    <h4>Скачать прайс-лист:</h4>
                    <ul>
                        <li>
                            <button className={cl.btn}>
                                Прайс-лист
                                <img src="images/header/download.svg" alt="" />
                            </button>
                        </li>
                        <li className={cl.info__messengers}>
                            <p>Связь в мессенджерах:</p>
                        </li>
                        <li className={cl.info__messengers}>
                            <a href="">
                                <img
                                    src="images/footer/whatsapp.svg"
                                    alt="WhatsApp"
                                />
                            </a>
                            <a href="">
                                <img
                                    src="images/footer/telegram.svg"
                                    alt="Telegram"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={cl.contacts}>
                    <h4>Контакты:</h4>
                    <ul>
                        <li className={cl.contacts__callcenter}>
                            <a href="">+7 (777) 490-00-91</a>
                            <p>время работы: 9:00-20:00</p>
                            <a href="">Заказать звонок</a>
                        </li>
                        <li className={cl.contacts__mail}>
                            <a href="">opt.sultan@mail.ru</a>
                            <p>На связи в любое время</p>
                        </li>
                        <li className={cl.contacts__payment}>
                            <img src="images/footer/visa.svg" alt="Visa" />
                            <img
                                src="images/footer/mastercard.svg"
                                alt="Master Card"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
