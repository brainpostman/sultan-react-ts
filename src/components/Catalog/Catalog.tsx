import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import useCareFilter from '../../hooks/useCareFilter';
import useCareState from '../../hooks/useCareState';
import useMnfctState from '../../hooks/useMnfctState';
import useSort from '../../hooks/useSort';
import { ICatalogItem, ICareFilter, IManufacturerInfo } from '../../types/catalogItem';
import { createMnfctrsArr } from '../../utils/createMnfctrsArr';
import List from '../UI/List';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import CatalogItem from './CatalogItem/CatalogItem';
import Checkbox from '../UI/Checkbox/Checkbox';
import Select from '../UI/Select/Select';
import CareFilter from './CareFilter';
import cl from './Catalog.module.scss';
import Pagination from '../UI/Pagination/Pagination';
import { useAppSelector } from '../../hooks/ReduxHooks';
import Back from '../UI/Back/Back';
import useMobile from '../../hooks/useMobile';
import { defaultCareFiltersArr } from '../../utils/createCareFiltersArr';

const Catalog = () => {
    //флаг адаптивной стилизации
    const mobile = useMobile(window.matchMedia('(max-width: 615px)'));
    //получение каталога из store (а там из localStorage)
    const { items: catalogItems } = useAppSelector((state) => state.catalog);
    const catalogArr = useMemo(() => {
        return Array.from(catalogItems.values());
    }, [catalogItems]);
    //состояния каталога
    const [items, setItems] = useState<ICatalogItem[]>(catalogArr);
    //состояния фильтров производителей и промежутка цен
    const [mnfctQuery, setMnfctQuery] = useState('');
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('99999');
    const [priceMnfctFilteredItems, setPriceMnfctFilteredItems] = useState<ICatalogItem[]>([
        ...catalogArr,
    ]);
    const defaultMnfct: IManufacturerInfo[] = useMemo(() => {
        return createMnfctrsArr([...items]);
    }, [items]);
    const { activeMnfct, setActiveMnfct, updateMnfctFlags } = useMnfctState();
    //состояние фильтра типа ухода
    const { activeCareFilters, setActiveCareFilters, updateCareFilter } = useCareState();
    //состояния сортировки
    const [sortType, setSortType] = useState('price');
    const [sortDirection, setSortDirection] = useState('ascend');
    const sortTypeOptions = [
        { value: 'price', name: 'Цена' },
        { value: 'name', name: 'Название' },
    ];
    const sortDirectionOptions = [
        { value: 'ascend', name: 'По возрастанию' },
        { value: 'descend', name: 'По убыванию' },
    ];
    //расширяющийся список производителей и фильтров (при мобильной стилизации)
    const [mnfctExpandList, setMnfctExpandList] = useState(false);
    const mnfctExpandRef = useRef<HTMLDivElement>(null);
    const initialMnfctShown = 4;
    const initialMnfctListHeight = 84;
    const maxListHeight = 315;

    function handleMnfctExpand() {
        setMnfctExpandList((prevValue) => {
            if (mnfctExpandRef.current) {
                if (!prevValue) {
                    mnfctExpandRef.current.style.height =
                        Math.min(mnfctExpandRef.current.scrollHeight, maxListHeight) + 'px';
                } else {
                    mnfctExpandRef.current.style.height = initialMnfctListHeight + 'px';
                }
            }
            return !prevValue;
        });
    }
    //расширение меню фильтров (при мобильной стилизации)
    const [filtersExpandMenu, setFiltersExpandMenu] = useState(false);
    const filtersExpandRef = useRef<HTMLDivElement>(null);

    const filtersExpandClass = filtersExpandMenu
        ? `${cl.filterDropdown} ${cl.filterDropdownActive}`
        : cl.filterDropdown;

    function handleFilterExpand() {
        setFiltersExpandMenu((prevValue) => {
            if (mnfctExpandRef.current && mnfctExpandList) {
                mnfctExpandRef.current.style.height = initialMnfctListHeight + 'px';
                setMnfctExpandList(false);
            }
            if (filtersExpandRef.current) {
                if (!prevValue) {
                    filtersExpandRef.current.style.height =
                        filtersExpandRef.current.scrollHeight + 'px';
                    filtersExpandRef.current.style.overflowY = 'scroll';
                } else {
                    filtersExpandRef.current.style.height = '0';
                    filtersExpandRef.current.style.overflowY = 'hidden';
                }
            }
            return !prevValue;
        });
    }

    //фильтр списка производителей
    const filteredMnfctrs = useMemo(() => {
        return defaultMnfct.filter((mnfct) =>
            mnfct.name.toLowerCase().includes(mnfctQuery.toLowerCase())
        );
    }, [mnfctQuery]);

    //управление компонентами промежутка цен
    const handleMinPriceBlur = () => {
        let minprice = +minPrice;
        let maxprice = +maxPrice;
        if (minprice >= maxprice) {
            setMinPrice(String(minprice === 0 ? 0 : maxprice - 1));
        }
    };

    const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = +event.target.value;
        setMinPrice(String(value));
    };

    const handleMaxPriceBlur = () => {
        let minprice = +minPrice;
        let maxprice = +maxPrice;
        if (minprice >= maxprice) {
            setMaxPrice(String(minprice + 1));
        }
    };

    const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = +event.target.value;
        setMaxPrice(String(value));
    };

    //фильтр по промежутку цен и производителям - возвращает первый фильтр, если применён
    const sortByPriceRange = (items: ICatalogItem[]) => {
        if (!maxPrice) {
            return items;
        }
        return items.filter((item) => {
            return item.price >= +minPrice && item.price <= +maxPrice;
        });
    };

    const sortByManufacturer = (items: ICatalogItem[]) => {
        if (activeMnfct.size === 0) {
            return items;
        }
        let filteredItems: ICatalogItem[] = [];
        for (let item of items) {
            for (let mnfct of activeMnfct) {
                if (item.mnfct === mnfct) {
                    filteredItems.push(item);
                    break;
                }
            }
        }
        return filteredItems;
    };

    const clearFilters = () => {
        setPriceMnfctFilteredItems([...catalogArr]);
        setActiveMnfct(new Set<string>());
        setActiveCareFilters(new Set<string>());
        setMinPrice('0');
        setMaxPrice('99999');
        setMnfctQuery('');
    };

    const filterByPriceRangeAndMnfct = () => {
        let filter1 = sortByPriceRange([...items]);
        let filter2 = sortByManufacturer(filter1);
        setPriceMnfctFilteredItems(filter2);
    };

    //фильтр по типу ухода - возвращает второй фильтр
    const filteredByCare: ICatalogItem[] = useCareFilter(
        priceMnfctFilteredItems,
        activeCareFilters
    );

    //сортировка по цене, названию, их направлению - последний шаг перед рендером
    const filteredByNamePrice: ICatalogItem[] = useSort(filteredByCare, sortType, sortDirection);

    return (
        <main className={cl.catalog}>
            <div className={cl.catalog__container}>
                {mobile ? (
                    <Back className={cl.back} />
                ) : (
                    <Breadcrumbs>
                        <span>Каталог</span>
                    </Breadcrumbs>
                )}
                <section className={cl.catalog__titleAndSort}>
                    <h2 className={cl.title}>КАТАЛОГ</h2>
                    {!mobile && (
                        <div className={cl.sort}>
                            Сортировка:
                            <Select
                                value={sortType}
                                onChange={(sort) => setSortType(sort)}
                                options={sortTypeOptions}
                                className={cl.select}
                            />
                            <Select
                                value={sortDirection}
                                onChange={(sort) => setSortDirection(sort)}
                                options={sortDirectionOptions}
                                className={cl.select}
                            />
                        </div>
                    )}
                    <List
                        items={defaultCareFiltersArr}
                        renderItem={(item: ICareFilter) => {
                            return (
                                <CareFilter
                                    filter={item}
                                    onClick={updateCareFilter}
                                    className={cl.careTypeTop__item}
                                    key={item.type}
                                    activeClass={
                                        activeCareFilters.has(item.type)
                                            ? cl.careTypeTop__item_active
                                            : ''
                                    }
                                />
                            );
                        }}
                        className={cl.careTypeTop}
                    />
                </section>
                <section className={cl.catalog__itemsAndFilters}>
                    <div className={cl.filters}>
                        <h5 className={cl.filters__title}>
                            ПОДБОР ПО ПАРАМЕТРАМ{' '}
                            {mobile && (
                                <div className={filtersExpandClass} onClick={handleFilterExpand}>
                                    <div></div>
                                </div>
                            )}
                        </h5>
                        <div className={cl.filters__container} ref={filtersExpandRef}>
                            <div className={cl.filters__price}>
                                <label>
                                    Цена <strong>₸</strong>
                                </label>
                                <div className={cl.price__inputs}>
                                    <input
                                        type='number'
                                        min={0}
                                        max={9999999}
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                        onBlur={handleMinPriceBlur}
                                    />{' '}
                                    -
                                    <input
                                        type='number'
                                        min={1}
                                        max={9999999}
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                        onBlur={handleMaxPriceBlur}
                                    />
                                </div>
                            </div>
                            <div className={cl.filters__mnfct}>
                                <label>Производитель</label>
                                <div className={`${cl.search} ${cl.input}`}>
                                    <input
                                        type='text'
                                        placeholder='Поиск...'
                                        value={mnfctQuery}
                                        onChange={(e) => setMnfctQuery(e.target.value)}
                                    />
                                    <button>
                                        <img src='images/header/search.svg' alt='Поиск' />
                                    </button>
                                </div>
                                <div className={cl.mnfct__list} ref={mnfctExpandRef}>
                                    {filteredMnfctrs.length !== 0 ? (
                                        <List
                                            items={filteredMnfctrs}
                                            renderItem={(item: IManufacturerInfo) => {
                                                return (
                                                    <Checkbox
                                                        item={item}
                                                        onChange={updateMnfctFlags}
                                                        checked={activeMnfct.has(item.name)}
                                                        key={item.name}
                                                        className={cl.mnfct__item}>
                                                        {item.name}
                                                        <span>{`(${item.amount})`}</span>
                                                    </Checkbox>
                                                );
                                            }}
                                        />
                                    ) : (
                                        <div className={cl.nomatch_mnfct}>Нет совпадений</div>
                                    )}
                                </div>
                                <button className={cl.showAll} onClick={handleMnfctExpand}>
                                    {filteredMnfctrs.length > initialMnfctShown && (
                                        <div>
                                            {mnfctExpandList ? (
                                                <div className={cl.showAll__container}>
                                                    Скрыть
                                                    <div className={cl.arrow_up}></div>
                                                </div>
                                            ) : (
                                                <div className={cl.showAll__container}>
                                                    Показать все
                                                    <div className={cl.arrow_down}></div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </button>
                                <div className={cl.filters__applyDelete}>
                                    <button className={cl.btn} onClick={filterByPriceRangeAndMnfct}>
                                        Показать
                                    </button>
                                    <button className={cl.btn} onClick={clearFilters}>
                                        <img src='images/trash.svg' />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <List
                            items={defaultCareFiltersArr}
                            renderItem={(item: ICareFilter) => {
                                return (
                                    <CareFilter
                                        onClick={updateCareFilter}
                                        filter={item}
                                        className={cl.careTypeLeft__item}
                                        key={item.type}
                                        activeClass={
                                            activeCareFilters.has(item.type)
                                                ? cl.careTypeLeft__item_active
                                                : ''
                                        }
                                    />
                                );
                            }}
                            className={cl.careTypeLeft}
                        />
                    </div>
                    {mobile && (
                        <div className={cl.sort}>
                            <div className={cl.sort__title}>Сортировка:</div>
                            <Select
                                value={sortType}
                                onChange={(sort) => setSortType(sort)}
                                options={sortTypeOptions}
                                className={cl.select}
                            />
                            <Select
                                value={sortDirection}
                                onChange={(sort) => setSortDirection(sort)}
                                options={sortDirectionOptions}
                                className={cl.select}
                            />
                        </div>
                    )}
                    {filteredByNamePrice.length !== 0 ? (
                        <Pagination
                            items={filteredByNamePrice}
                            renderItem={(item: ICatalogItem) => {
                                return <CatalogItem item={item} key={item.code} />;
                            }}
                            className={cl.catalog__items}
                        />
                    ) : (
                        <div className={cl.nomatch_shop}>Нет совпадений</div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Catalog;
