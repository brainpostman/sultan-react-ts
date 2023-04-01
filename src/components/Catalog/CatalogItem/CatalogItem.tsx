import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem } from '../../../store/action-creators/cartActions';
import { ICatalogItem, CareFilters } from '../../../types/catalogItem';
import cl from './CatalogItem.module.scss';
import MyImage from '../../UI/MyImage';

interface CatalogItemProps {
    item: ICatalogItem;
}

const CatalogItem = ({ item }: CatalogItemProps) => {
    const dispatch = useDispatch();
    const handleAddItem = () => dispatch(addItem(item));

    let careTypes: string[] = [];
    let careTypesObj = item.types;
    let defaultCareFilters = new CareFilters();
    for (let careType in careTypesObj) {
        if (careTypesObj[careType as keyof typeof careTypesObj]) {
            careTypes.push(defaultCareFilters[careType].value);
        }
    }

    return (
        <div className={cl.item}>
            <MyImage
                src={item.img}
                containerClass={cl.item__image}
                errorClass={cl.item__imgerror}
            />
            <p className={cl.item__quantity}>
                {item.unit === 'мл' ? (
                    <img src="/images/whh_bottle.svg" />
                ) : (
                    <img src="/images/fa-solid_box-open.svg" />
                )}
                <span>
                    {item.amount} {item.unit}
                </span>
            </p>
            <Link to={`${item.code}`}>
                <h5 className={cl.item__title}>
                    <span>{item.brand}</span>{' '}
                    {item.brand.length + item.name.length < 45
                        ? item.name
                        : item.name.slice(0, 45 - item.brand.length).trimEnd() +
                          '...'}
                </h5>
            </Link>
            <div className={cl.item__info}>
                <p>
                    Штрихкод: <span>{item.code}</span>
                </p>
                <p>
                    Производитель: <span>{item.mnfct}</span>
                </p>
                <p>
                    Бренд: <span>{item.brand}</span>
                </p>
                <p>
                    Типы ухода: <span>{careTypes.join(', ')}</span>
                </p>
            </div>
            <div className={cl.item__purchase}>
                <span className={cl.item__price}>
                    {String(item.price.toFixed(2))
                        .replace(/\./g, ',')
                        .replace(/,00/g, '') + ' ₸'}
                </span>
                <button
                    className={`${cl.btn} ${cl.item__buy}`}
                    onClick={handleAddItem}
                >
                    В КОРЗИНУ <img src="images/basket.svg" alt="" />
                </button>
            </div>
        </div>
    );
};

export default CatalogItem;
