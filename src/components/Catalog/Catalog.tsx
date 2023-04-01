import { ChangeEvent, useMemo, useState } from 'react';
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

const Catalog = () => {
    //получение каталога из store (а там из localStorage)
    const { items: catalogItems } = useTypedSelector((state) => state.catalog);

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

    //расширяющееся меню производителей
    const [mnfctDropdown, setMnfctDropdown] = useState(false);
    let mnfctListClasses = `${cl.mnfct__list} ${
        mnfctDropdown ? cl.mnfct__dropdown : ''
    }`;

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
                <Breadcrumbs>
                    <span>Каталог</span>
                </Breadcrumbs>
                <section className={cl.catalog__titleAndSort}>
                    <h2 className={cl.title}>КАТАЛОГ</h2>
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
                            ПОДБОР ПО ПАРАМЕТРАМ
                        </h5>
                        <div className={cl.filters__price}>
                            <label htmlFor="price">
                                Цена <strong>₸</strong>
                            </label>
                            <div className={cl.price__inputs}>
                                <input
                                    type="number"
                                    name="price"
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
                            <label className={cl.mnfct__title} htmlFor="mnfct">
                                Производитель
                            </label>
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
                            <List
                                items={filteredMnfctrs}
                                renderItem={(item: IManufacturerInfo) => {
                                    return (
                                        <Checkbox
                                            item={item}
                                            onChange={updateMnfctFlags}
                                            checked={item.checked}
                                            key={item.name}
                                            className={cl.mnfct__item}
                                        >
                                            {item.name}
                                            <span>{`(${item.amount})`}</span>
                                        </Checkbox>
                                    );
                                }}
                                className={mnfctListClasses}
                            />
                            <button
                                className={cl.showAll}
                                onClick={() => {
                                    setMnfctDropdown((prevValue) => {
                                        return !prevValue;
                                    });
                                }}
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
                                                    className={cl.arrow_down}
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
                                        active={cl.careTypeLeft__item_active}
                                    />
                                );
                            }}
                            className={cl.careTypeLeft}
                        />
                    </div>
                    <Pagination
                        items={filteredByNamePrice}
                        itemsPerPage={9}
                        renderItem={(item: ICatalogItem) => {
                            return <CatalogItem item={item} key={item.code} />;
                        }}
                        className={cl.catalog__items}
                    />
                </section>
            </div>
        </main>
    );
};

export default Catalog;
