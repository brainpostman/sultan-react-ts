import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import useCareFilter from '../../hooks/useCareFilter';
import useCareState from '../../hooks/useCareState';
import useMnfctState from '../../hooks/useMnfctState';
import useSort from '../../hooks/useSort';
import {
    ICatalogItem,
    ICareFilter,
    CareFilters,
    IManufacturerInfo,
} from '../../types/catalogItem';
import { createManufacturerMap } from '../../utils/createManufacturerLists';
import List from '../UI/List';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import CatalogItem from './CatalogItem/CatalogItem';
import Checkbox from '../UI/Checkbox/Checkbox';
import Select from '../UI/Select/Select';
import CareFilter from './CareFilter';
import cl from './Catalog.module.scss';
import Pagination from '../UI/Pagination/Pagination';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Back from '../UI/Back/Back';

const Catalog = () => {
    //получение каталога из store (а там из localStorage)
    const { items: catalogItems } = useTypedSelector((state) => state.catalog);

    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [mobile, setMobile] = useState(false);

    //расширяющееся меню производителей
    const [mnfctDropdown, setMnfctDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    function handleMnfctDropdown() {
        setMnfctDropdown((prevValue) => {
            if (dropdownRef.current) {
                if (!prevValue) {
                    dropdownRef.current.style.height = `${
                        filteredMnfctrs.length * 21
                    }px`;
                } else {
                    dropdownRef.current.style.height = '84px';
                }
            }
            return !prevValue;
        });
    }

    const [filtersDropdown, setFiltersDropdown] = useState(false);
    const filtersDropdownRef = useRef<HTMLDivElement>(null);

    const filterDropdownClass = filtersDropdown
        ? `${cl.filterDropdown} ${cl.filterDropdownActive}`
        : cl.filterDropdown;

    function handleFilterDropdown() {
        setFiltersDropdown((prevValue) => {
            if (dropdownRef.current && mnfctDropdown) {
                dropdownRef.current.style.height = '84px';
                setMnfctDropdown(false);
            }
            if (filtersDropdownRef.current) {
                if (!prevValue) {
                    filtersDropdownRef.current.style.height = '846px';
                } else {
                    filtersDropdownRef.current.style.height = '0';
                }
            }
            return !prevValue;
        });
    }

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(max-width: 1415px)');
        const mediaQueryList2 = window.matchMedia('(max-width: 1024px)');
        const mediaQueryList3 = window.matchMedia('(max-width: 615px)');
        handleWindowResize3();
        function handleWindowResize1() {
            if (mediaQueryList.matches) {
                setItemsPerPage(10);
            } else {
                setItemsPerPage(9);
            }
        }
        function handleWindowResize2() {
            if (mediaQueryList2.matches) {
                setItemsPerPage(5);
            } else {
                handleWindowResize1();
            }
        }
        function handleWindowResize3() {
            if (mediaQueryList3.matches) {
                setItemsPerPage(15);
            } else {
                handleWindowResize2();
            }
        }
        mediaQueryList.addEventListener('change', handleWindowResize1);
        mediaQueryList2.addEventListener('change', handleWindowResize2);
        mediaQueryList3.addEventListener('change', handleWindowResize3);
        return () => {
            mediaQueryList.removeEventListener('change', handleWindowResize1);
            mediaQueryList2.removeEventListener('change', handleWindowResize2);
            mediaQueryList3.removeEventListener('change', handleWindowResize3);
        };
    }, []);

    useEffect(() => {
        const mediaQueryList = window.matchMedia('(max-width: 615px)');
        handleWindowResize();
        function handleWindowResize() {
            if (mediaQueryList.matches) {
                setMobile(true);
            } else {
                setMobile(false);
            }
        }
        mediaQueryList.addEventListener('change', handleWindowResize);
        return () => {
            mediaQueryList.removeEventListener('change', handleWindowResize);
        };
    }, []);

    const catalogArr = useMemo(() => {
        return Array.from(catalogItems.values());
    }, [catalogItems]);
    //состояния каталога
    const [items, setItems] = useState<ICatalogItem[]>(catalogArr);
    //состояния фильтров производителей и промежутка цен
    const [mnfctQuery, setMnfctQuery] = useState('');
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('99999');
    const [filteredItems, setFilteredItems] = useState<ICatalogItem[]>([
        ...catalogArr,
    ]);
    const manufacturersMap: Map<string, IManufacturerInfo> =
        createManufacturerMap(catalogArr);
    const {
        manufacturers,
        setManufacturers,
        activeMnfct,
        setActiveMnfct,
        updateMnfctFlags,
    } = useMnfctState(manufacturersMap);
    //состояние фильтра типа ухода
    const careFiltersMap = new Map<string, ICareFilter>();
    const defaultCareFilters = new CareFilters();
    for (let filter in defaultCareFilters) {
        careFiltersMap.set(filter, defaultCareFilters[filter]);
    }
    const { careFilters, activeCareFilters, updateCareFilter } =
        useCareState(careFiltersMap);
    //состояния сортировки
    const [selectedSort, setSelectedSort] = useState('price');
    const [sortDirection, setSortDirection] = useState('ascend');

    //фильтр списка производителей
    const filteredMnfctrs = useMemo(() => {
        return Array.from(manufacturers.values()).filter((mnfct) =>
            mnfct.name.toLowerCase().includes(mnfctQuery.toLowerCase())
        );
    }, [mnfctQuery, manufacturers]);

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
        setFilteredItems([...items]);
        setManufacturers(manufacturersMap);
        setActiveMnfct(new Set<string>());
        setMinPrice('0');
        setMaxPrice('99999');
        setMnfctQuery('');
    };

    const filterByPriceRangeAndMnfct = () => {
        let filter1 = sortByPriceRange([...items]);
        let filter2 = sortByManufacturer(filter1);
        setFilteredItems(filter2);
    };

    //фильтр по типу ухода - возвращает второй фильтр
    const filteredByCare: ICatalogItem[] = useCareFilter(
        filteredItems,
        activeCareFilters
    );

    //сортировка по цене, названию, их направлению - последний шаг перед рендером
    const filteredByNamePrice: ICatalogItem[] = useSort(
        filteredByCare,
        selectedSort,
        sortDirection
    );

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
                                value={selectedSort}
                                onChange={(sort) => setSelectedSort(sort)}
                                options={[
                                    { value: 'price', name: 'Цена' },
                                    { value: 'name', name: 'Название' },
                                ]}
                                className={cl.select}
                            />
                            <Select
                                value={sortDirection}
                                onChange={(sort) => setSortDirection(sort)}
                                options={[
                                    { value: 'ascend', name: 'По возрастанию' },
                                    { value: 'descend', name: 'По убыванию' },
                                ]}
                                className={cl.select}
                            />
                        </div>
                    )}
                    <List
                        items={Array.from(careFilters.values())}
                        renderItem={(item: ICareFilter) => {
                            return (
                                <CareFilter
                                    filter={item}
                                    onClick={updateCareFilter}
                                    className={cl.careTypeTop__item}
                                    key={item.type}
                                    active={cl.careTypeTop__item_active}
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
                                <div
                                    className={filterDropdownClass}
                                    onClick={handleFilterDropdown}
                                >
                                    <div></div>
                                </div>
                            )}
                        </h5>
                        <div
                            className={cl.filters__container}
                            ref={filtersDropdownRef}
                        >
                            <div className={cl.filters__price}>
                                <label>
                                    Цена <strong>₸</strong>
                                </label>
                                <div className={cl.price__inputs}>
                                    <input
                                        type="number"
                                        min={0}
                                        max={9999999}
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                        onBlur={handleMinPriceBlur}
                                    />{' '}
                                    -
                                    <input
                                        type="number"
                                        name="price"
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
                                        type="text"
                                        placeholder="Поиск..."
                                        value={mnfctQuery}
                                        onChange={(e) =>
                                            setMnfctQuery(e.target.value)
                                        }
                                    />
                                    <button>
                                        <img
                                            src="images/header/search.svg"
                                            alt="Поиск"
                                        />
                                    </button>
                                </div>
                                <div
                                    className={cl.mnfct__list}
                                    ref={dropdownRef}
                                >
                                    {filteredMnfctrs.length !== 0 ? (
                                        <List
                                            items={filteredMnfctrs}
                                            renderItem={(
                                                item: IManufacturerInfo
                                            ) => {
                                                return (
                                                    <Checkbox
                                                        item={item}
                                                        onChange={
                                                            updateMnfctFlags
                                                        }
                                                        checked={item.checked}
                                                        key={item.name}
                                                        className={
                                                            cl.mnfct__item
                                                        }
                                                    >
                                                        {item.name}
                                                        <span>{`(${item.amount})`}</span>
                                                    </Checkbox>
                                                );
                                            }}
                                        />
                                    ) : (
                                        <div className={cl.nomatch_mnfct}>
                                            Нет совпадений
                                        </div>
                                    )}
                                </div>
                                <button
                                    className={cl.showAll}
                                    onClick={handleMnfctDropdown}
                                >
                                    {filteredMnfctrs.length > 4 && (
                                        <div>
                                            {mnfctDropdown ? (
                                                <div
                                                    className={
                                                        cl.showAll__container
                                                    }
                                                >
                                                    Скрыть
                                                    <div
                                                        className={cl.arrow_up}
                                                    ></div>
                                                </div>
                                            ) : (
                                                <div
                                                    className={
                                                        cl.showAll__container
                                                    }
                                                >
                                                    Показать все
                                                    <div
                                                        className={
                                                            cl.arrow_down
                                                        }
                                                    ></div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </button>
                                <div className={cl.filters__applyDelete}>
                                    <button
                                        className={cl.btn}
                                        onClick={filterByPriceRangeAndMnfct}
                                    >
                                        Показать
                                    </button>
                                    <button
                                        className={cl.btn}
                                        onClick={clearFilters}
                                    >
                                        <img src="images/trash.svg" />
                                    </button>
                                </div>
                            </div>
                            <List
                                items={Array.from(careFilters.values())}
                                renderItem={(item: ICareFilter) => {
                                    return (
                                        <CareFilter
                                            onClick={updateCareFilter}
                                            filter={item}
                                            className={cl.careTypeLeft__item}
                                            key={item.type}
                                            active={
                                                cl.careTypeLeft__item_active
                                            }
                                        />
                                    );
                                }}
                                className={cl.careTypeLeft}
                            />
                        </div>
                    </div>
                    {mobile && (
                        <div className={cl.sort}>
                            <div className={cl.sort__title}>Сортировка:</div>
                            <Select
                                value={selectedSort}
                                onChange={(sort) => setSelectedSort(sort)}
                                options={[
                                    { value: 'price', name: 'Цена' },
                                    { value: 'name', name: 'Название' },
                                ]}
                                className={cl.select}
                            />
                            <Select
                                value={sortDirection}
                                onChange={(sort) => setSortDirection(sort)}
                                options={[
                                    { value: 'ascend', name: 'По возрастанию' },
                                    { value: 'descend', name: 'По убыванию' },
                                ]}
                                className={cl.select}
                            />
                        </div>
                    )}
                    {filteredByNamePrice.length !== 0 ? (
                        <Pagination
                            items={filteredByNamePrice}
                            itemsPerPage={itemsPerPage}
                            renderItem={(item: ICatalogItem) => {
                                return (
                                    <CatalogItem item={item} key={item.code} />
                                );
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
