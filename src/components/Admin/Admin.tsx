import { ChangeEvent, useMemo, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
    ICareFilter,
    ICatalogItem,
    CareFilters,
    CatalogItem,
} from '../../types/catalogItem';
import List from '../UI/List';
import cl from './Admin.module.scss';
import useCareFilter from '../../hooks/useCareFilter';
import useCareState from '../../hooks/useCareState';
import useSort from '../../hooks/useSort';
import CareFilter from '../Catalog/CareFilter';
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs';
import Pagination from '../UI/Pagination/Pagination';
import Select from '../UI/Select/Select';
import AdminItem from './AdminItem/AdminItem';
import deepCopyMap from '../../utils/deepCopyMap';
import { useDispatch } from 'react-redux';
import { updateCatalog } from '../../store/action-creators/catalogActions';
import Modal from '../UI/Modal/Modal';
import { createCatalogMap } from '../../utils/createCatalogMap';
import ItemEditModal from './ItemEditModal/ItemEditModal';
import useItemFieldFilter from '../../hooks/useItemFieldFilter';

const Admin = () => {
    const [showSaveModal, setShowSaveModal] = useState(false);
    const { items: catalogItems } = useTypedSelector((state) => state.catalog);
    const dispatch = useDispatch();
    const [catalogMap, setCatalogMap] = useState<Map<string, ICatalogItem>>(
        deepCopyMap(catalogItems)
    );
    const careFiltersMap = new Map<string, ICareFilter>();
    const defaultCareFilters = new CareFilters();
    for (let filter in defaultCareFilters) {
        careFiltersMap.set(filter, defaultCareFilters[filter]);
    }

    const [showAddModal, setShowAddModal] = useState(false);

    const [newItemCareFilterState, setNewItemCareFilterState] = useState<
        Map<string, ICareFilter>
    >(deepCopyMap(careFiltersMap));

    let catalogArr: ICatalogItem[] = useMemo(() => {
        return Array.from(catalogMap.values());
    }, [catalogMap]);

    const handleDelete = (itemCode: string) => {
        let tempMap = deepCopyMap(catalogMap);
        let bool = tempMap.delete(itemCode);
        console.log(bool);
        setCatalogMap(tempMap);
    };

    const saveCatalogChanges = () => {
        if (catalogMap.size === 0) {
            localStorage.clear();
            let tempMap: Map<string, ICatalogItem> = createCatalogMap();
            dispatch(updateCatalog(tempMap));
        } else {
            dispatch(updateCatalog(catalogMap));
            let catalogStr = JSON.stringify(catalogArr);
            localStorage.setItem('catalog', catalogStr);
        }
        setShowSaveModal(true);
    };

    //состояния фильтров промежутка цен
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('99999');

    //состояния фильтров полей товара
    const [nameQuery, setNameQuery] = useState('');
    const [codeQuery, setCodeQuery] = useState('');
    const [mnfctQuery, setMnfctQuery] = useState('');
    const [brandQuery, setBrandQuery] = useState('');
    const [descrQuery, setDescrQuery] = useState('');

    let itemFieldsArr: Array<{
        fieldName: string;
        value: string;
        setter: React.Dispatch<React.SetStateAction<string>>;
    }> = [
        { fieldName: 'Название', value: nameQuery, setter: setNameQuery },
        { fieldName: 'Штрихкод', value: codeQuery, setter: setCodeQuery },
        {
            fieldName: 'Производитель',
            value: mnfctQuery,
            setter: setMnfctQuery,
        },
        { fieldName: 'Бренд', value: brandQuery, setter: setBrandQuery },
        {
            fieldName: 'Описание',
            value: descrQuery,
            setter: setDescrQuery,
        },
    ];

    const filteredByItemFields = useItemFieldFilter(
        nameQuery,
        codeQuery,
        mnfctQuery,
        brandQuery,
        descrQuery,
        catalogArr
    );

    //состояние фильтра типа ухода
    const { careFilters, activeCareFilters, updateCareFilter } =
        useCareState(careFiltersMap);
    //состояния сортировки
    const [selectedSort, setSelectedSort] = useState('price');
    const [sortDirection, setSortDirection] = useState('ascend');

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

    //фильтр по промежутку цен - возвращает первый фильтр, если применён
    const sortByPriceRange = (items: ICatalogItem[]) => {
        if (!maxPrice) {
            return items;
        }
        return items.filter((item) => {
            return item.price >= +minPrice && item.price <= +maxPrice;
        });
    };

    const filteredByPriceRange = useMemo(() => {
        return sortByPriceRange([...filteredByItemFields]);
    }, [minPrice, maxPrice, filteredByItemFields]);

    //фильтр по типу ухода - возвращает второй фильтр
    const filteredByCare: ICatalogItem[] = useCareFilter(
        filteredByPriceRange,
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
                    <span>Управление каталогом</span>
                </Breadcrumbs>
                <section className={cl.catalog__titleAndSort}>
                    <h2 className={cl.title}>УПРАВЛЕНИЕ КАТАЛОГОМ</h2>
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
                                    min={1}
                                    max={9999999}
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                    onBlur={handleMaxPriceBlur}
                                />
                            </div>
                        </div>
                        <List
                            items={itemFieldsArr}
                            renderItem={(item) => {
                                return (
                                    <div
                                        className={cl.container}
                                        key={item.fieldName}
                                    >
                                        <label className={cl.filter}>
                                            {item.fieldName}
                                        </label>
                                        <div
                                            className={`${cl.search} ${cl.input}`}
                                        >
                                            <input
                                                value={item.value}
                                                onChange={(event) =>
                                                    item.setter(
                                                        event.target.value
                                                    )
                                                }
                                                type="text"
                                                placeholder="Поиск..."
                                            />
                                            <button>
                                                <img
                                                    src="/images/header/search.svg"
                                                    alt="Поиск"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        <div>
                            <button
                                className={cl.btn}
                                onClick={() => {
                                    setShowAddModal(true);
                                }}
                            >
                                Добавить товар
                            </button>
                            <button
                                className={cl.btn}
                                onClick={() => {
                                    setCatalogMap(
                                        new Map<string, ICatalogItem>()
                                    );
                                }}
                            >
                                Очистить каталог
                            </button>
                            <button
                                className={cl.btn}
                                onClick={saveCatalogChanges}
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    </div>
                    <Pagination
                        items={filteredByNamePrice}
                        itemsPerPage={9}
                        renderItem={(item: ICatalogItem) => {
                            return (
                                <AdminItem
                                    item={item}
                                    key={item.code}
                                    handleDelete={handleDelete}
                                    catalogMap={deepCopyMap(catalogMap)}
                                    setCatalogMap={setCatalogMap}
                                />
                            );
                        }}
                        className={cl.catalog__items}
                    />
                </section>
            </div>
            {showSaveModal && (
                <Modal
                    className={cl.modalbg}
                    onClick={() => setShowSaveModal(false)}
                >
                    <div
                        className={cl.modal}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div
                            className={cl.close}
                            onClick={() => setShowSaveModal(false)}
                        ></div>
                        <div className={cl.modalcheck}>
                            <img src="/images/double-check.svg" />
                        </div>
                        <h3>ИЗМЕНЕНИЯ СОХРАНЕНЫ</h3>
                    </div>
                </Modal>
            )}
            {showAddModal && (
                <ItemEditModal
                    item={new CatalogItem()}
                    setIsRedacting={setShowAddModal}
                    defaultCareFilters={deepCopyMap(careFiltersMap)}
                    careFilterState={newItemCareFilterState}
                    setCareFilterState={setNewItemCareFilterState}
                    saveChanges={(
                        newCode: string,
                        newItemProps: ICatalogItem
                    ) => {
                        const tempMap = deepCopyMap(catalogMap);
                        tempMap.set(newCode, newItemProps);
                        setShowAddModal(false);
                        setCatalogMap(tempMap);
                    }}
                />
            )}
        </main>
    );
};

export default Admin;
