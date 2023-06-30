import { ICatalogItem } from '../../../types/catalogItem';
import cl from './AdminItem.module.scss';
import MyImage from '../../UI/MyImage';
import { useState } from 'react';
import ItemEditModal from '../ItemEditModal/ItemEditModal';
import { defaultCareFiltersArr } from '../../../utils/createCareFiltersArr';

interface CatalogItemProps {
    item: ICatalogItem;
    handleDelete: (itemCode: string) => void;
    saveItemChanges: (itemCode: string, newItemProps: ICatalogItem) => void;
}

const AdminItem = ({ item, handleDelete, saveItemChanges }: CatalogItemProps) => {
    const [isRedacting, setIsRedacting] = useState(false);

    return (
        <div className={cl.item} data-testid='admin-item'>
            <MyImage
                src={item.img}
                containerClass={cl.item__image}
                errorClass={cl.item__imgerror}
            />
            <div className={cl.info}>
                <div className={cl.name}>
                    Название: <span data-testid='item-name'>{item.name}</span>
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
                    onClick={() => handleDelete(item.code)}
                    data-testid='item-delete'>
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
                    saveChanges={(newItemProps: ICatalogItem) => {
                        saveItemChanges(item.code, newItemProps);
                        setIsRedacting(false);
                    }}
                />
            )}
        </div>
    );
};

export default AdminItem;
