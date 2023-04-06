import { ICatalogItem } from '../../../types/catalogItem';
import cl from './AdminItem.module.scss';
import MyImage from '../../UI/MyImage';
import { useState } from 'react';
import ItemEditModal from '../ItemEditModal/ItemEditModal';
import { defaultCareFiltersArr } from '../../../utils/createCareFiltersArr';

interface CatalogItemProps {
    item: ICatalogItem;
    handleDelete: (itemCode: string) => void;
    catalogMap: Map<string, ICatalogItem>;
    setCatalogMap: (value: React.SetStateAction<Map<string, ICatalogItem>>) => void;
}

const AdminItem = ({ item, handleDelete, catalogMap, setCatalogMap }: CatalogItemProps) => {
    const [isRedacting, setIsRedacting] = useState(false);

    return (
        <div className={cl.item}>
            <MyImage
                src={item.img}
                containerClass={cl.item__image}
                errorClass={cl.item__imgerror}
            />
            <div className={cl.info}>
                <div className={cl.name}>
                    Название: <span>{item.name}</span>
                </div>
                <div className={cl.unit}>
                    Единица измерения: <span>{item.unit}</span>
                </div>
                <div className={cl.amount}>
                    Количество:{' '}
                    <span>
                        {item.amount} {item.unit}
                    </span>
                </div>
                <div className={cl.code}>
                    Штрихкод: <span>{item.code}</span>
                </div>
                <div className={cl.mnfct}>
                    Производитель: <span>{item.mnfct}</span>
                </div>
                <div className={cl.brand}>
                    Бренд: <span>{item.brand}</span>
                </div>
                <div className={cl.descr}>
                    Описание: <span>{item.descr}</span>
                </div>
                <div className={cl.price}>
                    Цена: <span>{item.price} ₸</span>
                </div>
                <div className={cl.careTypes}>
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
                </div>
            </div>
            <div className={cl.item__controls}>
                <button
                    className={`${cl.btn} ${cl.delete}`}
                    onClick={() => handleDelete(item.code)}>
                    <img src='images/trash.svg' alt='Удалить' />
                </button>
                <button className={`${cl.btn} ${cl.redact}`} onClick={() => setIsRedacting(true)}>
                    Редактировать
                </button>
            </div>
            {isRedacting && (
                <ItemEditModal
                    item={item}
                    setIsRedacting={setIsRedacting}
                    saveChanges={(newCode: string, newItemProps: ICatalogItem) => {
                        catalogMap.delete(item.code);
                        catalogMap.set(newCode, newItemProps);
                        setIsRedacting(false);
                        setCatalogMap(catalogMap);
                    }}
                />
            )}
        </div>
    );
};

export default AdminItem;
