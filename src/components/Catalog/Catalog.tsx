import { ChangeEvent, useMemo, useState } from 'react';
import useCareFilter from '../../hooks/useCareFilter';
import useCareState from '../../hooks/useCareState';
import useMnfctState from '../../hooks/useMnfctState';
import useSort from '../../hooks/useSort';
import { IShopItem, ICareType, careFiltersObj, IManufacturerInfo } from '../../types/shopItem';
import { createManufacturerMap } from '../../utils/createManufacturerLists';
import List from '../UI/List';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import CatalogItem from '../UI/CatalogItem/CatalogItem';
import Checkbox from '../UI/Checkbox/Checkbox';
import Select from '../UI/Select/Select';
import CareFilter from './CareFilter';
import cl from './Catalog.module.scss';
import Pagination from '../UI/Pagination/Pagination';

interface CatalogProps {
    catalog: IShopItem[];
}

const Catalog = ({ catalog }: CatalogProps) => {

    const optionalPath = localStorage.getItem('catalogImgPath');
    const catalogImgPath = optionalPath || 'src/assets/images/catalog/';
    const [items, setItems] = useState<IShopItem[]>([...catalog]);

    //price range and manufacturer filter - returns first filter
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('99999');
    const [filteredItems, setFilteredItems] = useState<IShopItem[]>([...items]);

    const handleMinPriceBlur = () => {
        let minprice = +minPrice;
        let maxprice = +maxPrice;
        if (minprice >= maxprice) {
            setMinPrice(String((minprice === 0) ? 0 : maxprice - 1));
        }
    }

    const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = +event.target.value;
        setMinPrice(String(value));
    }

    const handleMaxPriceBlur = () => {
        let minprice = +minPrice;
        let maxprice = +maxPrice;
        if (minprice >= maxprice) {
            setMaxPrice(String((minprice === 0) ? 0 : minprice + 1));
        }
    }

    const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = +event.target.value;
        setMaxPrice(String(value));
    }

    const sortByPriceRange = (items: IShopItem[]) => {
        if (!maxPrice) {
            return items;
        }
        return items.filter(item => {
            return item.price >= +minPrice && item.price <= +maxPrice;
        })
    }

    const manufacturersMap: Map<string, IManufacturerInfo> = createManufacturerMap(catalog);
    const { manufacturers, setManufacturers, activeMnfct, setActiveMnfct, updateMnfctFlags } = useMnfctState(manufacturersMap);

    //manufacturer dropdown
    const [mnfctDropdown, setMnfctDropdown] = useState(false);
    let mnfctListClasses = `${cl.mnfct__list} ${(mnfctDropdown) ? cl.mnfct__dropdown : ''}`

    //manufacturer dropdown filter
    const [mnfctQuery, setMnfctQuery] = useState('');

    const filteredMnfctrs = useMemo(() => {
        return Array.from(manufacturers.values()).filter(mnfct => mnfct.name.toLowerCase().includes(mnfctQuery.toLowerCase()));
    }, [mnfctQuery, manufacturers]);

    const sortByManufacturer = (items: IShopItem[]) => {
        if (activeMnfct.size === 0) {
            return items;
        }
        let filteredItems: IShopItem[] = [];
        for (let item of items) {
            for (let mnfct of activeMnfct) {
                if (item.mnfct === mnfct) {
                    filteredItems.push(item);
                    break;
                }
            }
        }
        return filteredItems;
    }

    const clearFilters = () => {
        setFilteredItems([...items]);
        setManufacturers(manufacturersMap);
        setActiveMnfct(new Set<string>);
        setMinPrice('0');
        setMaxPrice('99999');
        setMnfctQuery('');
    }

    const filterByPriceRangeAndMnfct = () => {
        let filter1 = sortByPriceRange([...items]);
        let filter2 = sortByManufacturer(filter1);
        setFilteredItems(filter2);

    }

    //care filters - returns second filter
    const careFiltersMap = new Map<string, ICareType>();
    for (let filter in careFiltersObj) {
        careFiltersMap.set(filter, (careFiltersObj[filter]));
    }
    const { careFilters, activeCareFilters, updateCareFilter } = useCareState(careFiltersMap);
    const filteredByCare: IShopItem[] = useCareFilter(filteredItems, activeCareFilters);

    //price, name, ascend, descend - returns final sort;
    const [selectedSort, setSelectedSort] = useState('price');
    const [sortDirection, setSortDirection] = useState('ascend');
    const filteredByNamePrice: IShopItem[] = useSort(filteredByCare, selectedSort, sortDirection);

    return (
        <main className={cl.catalog}>
            <div className={cl.catalog__container}>
                <Breadcrumbs>
                    <span>Главная</span><span>Каталог</span>
                </Breadcrumbs>
                <section className={cl.catalog__titleAndSort}>
                    <h2 className={cl.title}>КАТАЛОГ</h2>
                    <div className={cl.sort}>
                        Сортировка:
                        <Select
                            value={selectedSort}
                            onChange={sort => setSelectedSort(sort)}
                            options={[
                                { value: 'price', name: 'Цена' },
                                { value: 'name', name: 'Название' }
                            ]}
                            className={cl.select}
                        />
                        <Select
                            value={sortDirection}
                            onChange={sort => setSortDirection(sort)}
                            options={[
                                { value: 'ascend', name: 'По возрастанию' },
                                { value: 'descend', name: 'По убыванию' }
                            ]}
                            className={cl.select}
                        />
                    </div>
                    <List
                        items={Array.from(careFilters.values())}
                        renderItem={(item: ICareType) => {
                            return <CareFilter
                                filter={item}
                                onClick={updateCareFilter}
                                className={cl.careTypeTop__item}
                                key={item.type}
                                active={cl.careTypeTop__item_active}
                            />
                        }}
                        className={cl.careTypeTop}
                    />
                </section>
                <section className={cl.catalog__itemsAndFilters}>
                    <div className={cl.filters}>
                        <h5 className={cl.filters__title}>ПОДБОР ПО ПАРАМЕТРАМ</h5>
                        <div className={cl.filters__price}>
                            <label htmlFor="price">Цена <strong>₸</strong></label>
                            <div className={cl.price__inputs}>
                                <input
                                    type="number"
                                    name="price"
                                    min={0} max={9999999}
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                    onBlur={handleMinPriceBlur}
                                /> -
                                <input
                                    type="number"
                                    name="price"
                                    min={1} max={9999999}
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    onBlur={handleMaxPriceBlur}
                                />
                            </div>
                        </div>
                        <div className={cl.filters__mnfct}>
                            <label className={cl.mnfct__title} htmlFor='mnfct'>Производитель</label>
                            <div className={`${cl.search} ${cl.input}`}>
                                <input type="text" placeholder="Поиск..." value={mnfctQuery} onChange={e => setMnfctQuery(e.target.value)} />
                                <button><img src="src\assets\images\header\search.svg" alt="Поиск" /></button>
                            </div>
                            <List
                                items={filteredMnfctrs}
                                renderItem={(item: IManufacturerInfo) => {
                                    return <Checkbox
                                        item={item}
                                        onChange={updateMnfctFlags}
                                        checked={item.checked}
                                        key={item.name}
                                        id={item.name}
                                        className={cl.mnfct__item}>
                                        {item.name}<span>{`(${item.amount})`}</span>
                                    </Checkbox>
                                }}
                                className={mnfctListClasses}
                            />
                            <button className={cl.showAll} onClick={() => {
                                setMnfctDropdown(prevValue => {
                                    return !prevValue;
                                });
                            }}>
                                {filteredMnfctrs.length > 4 && <div>{mnfctDropdown  ?
                                    <div className={cl.showAll__container}>Скрыть<div className={cl.arrow_up}></div></div>
                                    :
                                    <div className={cl.showAll__container}>Показать все<div className={cl.arrow_down}></div></div>
                                }</div>}
                            </button>
                            <div className={cl.filters__applyDelete}>
                                <button
                                    className={cl.btn}
                                    onClick={filterByPriceRangeAndMnfct}
                                >Показать</button>
                                <button
                                    className={cl.btn}
                                    onClick={clearFilters}
                                ><img src="src/assets/images/trash.svg" /></button>
                            </div>
                        </div>
                        <List
                            items={Array.from(careFilters.values())}
                            renderItem={(item: ICareType) => {
                                return <CareFilter
                                    onClick={updateCareFilter}
                                    filter={item}
                                    className={cl.careTypeLeft__item}
                                    key={item.type}
                                    active={cl.careTypeLeft__item_active}
                                />
                            }}
                            className={cl.careTypeLeft}
                        />
                    </div>
                    <Pagination
                        items={filteredByNamePrice}
                        itemsPerPage={9}
                        visiblePages={5}
                        renderItem={(item: IShopItem) => {
                            return <CatalogItem
                                item={item}
                                imgPath={catalogImgPath}
                                key={item.code}
                            />
                        }}
                        className={cl.catalog__items}
                    />
                </section>
            </div>
        </main>
    );
}

export default Catalog;