import {
    ICareFilter,
    ICatalogItem,
    CareFilters,
} from '../../../types/catalogItem';
import cl from './AdminItem.module.scss';
import MyImage from '../../UI/MyImage';
import { useState } from 'react';
import deepCopyMap from '../../../utils/deepCopyMap';
import ItemEditModal from '../ItemEditModal/ItemEditModal';

interface CatalogItemProps {
    item: ICatalogItem;
    handleDelete: (itemCode: string) => void;
    catalogMap: Map<string, ICatalogItem>;
    setCatalogMap: (
        value: React.SetStateAction<Map<string, ICatalogItem>>
    ) => void;
}

const CatalogItem = ({
    item,
    handleDelete,
    catalogMap,
    setCatalogMap,
}: CatalogItemProps) => {
    let careTypeStringsArr: string[] = [];
    let careTypesObj = item.types;

    let careFilters = new Map<string, ICareFilter>();
    let defaultCareFilters = new CareFilters();
    for (let careType in defaultCareFilters) {
        careFilters.set(careType, defaultCareFilters[careType]);
        if (careTypesObj[careType]) {
            let filter = careFilters.get(careType);
            if (filter) filter.checked = true;
            careTypeStringsArr.push(defaultCareFilters[careType].value);
        }
    }

    const [careFilterState, setCareFilterState] = useState<
        Map<string, ICareFilter>
    >(deepCopyMap(careFilters));
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
                    Типы ухода: <span>{careTypeStringsArr.join(', ')}</span>
                </div>
            </div>
            <div className={cl.item__controls}>
                <button
                    className={`${cl.btn} ${cl.delete}`}
                    onClick={() => handleDelete(item.code)}
                >
                    <img src="images/trash.svg" alt="Удалить" />
                </button>
                <button
                    className={`${cl.btn} ${cl.redact}`}
                    onClick={() => setIsRedacting(true)}
                >
                    Редактировать
                </button>
            </div>
            {isRedacting && (
                <ItemEditModal
                    item={item}
                    setIsRedacting={setIsRedacting}
                    defaultCareFilters={careFilters}
                    careFilterState={careFilterState}
                    setCareFilterState={setCareFilterState}
                    saveChanges={(
                        newCode: string,
                        newItemProps: ICatalogItem
                    ) => {
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

export default CatalogItem;
