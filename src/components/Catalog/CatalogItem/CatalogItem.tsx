import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItem } from '../../../store/action-creators/cartActions';
import { ICatalogItem } from '../../../types/catalogItem';
import cl from './CatalogItem.module.scss';

interface CatalogItemProps {
    item: ICatalogItem;
    imgPath: string;
}

const CatalogItem = ({ item, imgPath }: CatalogItemProps) => {
    const [imgIsLoaded, setImgIsLoaded] = useState(true);
    const dispatch = useDispatch();
    const handleAddItem = () => dispatch(addItem(item));

    return (
        <div className={cl.item}>
            <div className={cl.item__image}>
                {imgIsLoaded ? (
                    <img
                        src={`${imgPath}${item.img}`}
                        onLoad={() => {
                            setImgIsLoaded(true);
                        }}
                        onError={() => {
                            setImgIsLoaded(false);
                        }}
                    />
                ) : (
                    <div className={cl.item__imgerror}>
                        Изображение
                        <br />
                        недоступно
                    </div>
                )}
            </div>
            <p className={cl.item__quantity}>
                {item.unit === 'мл' ? (
                    <img src="src/assets/images/whh_bottle.svg" />
                ) : (
                    <img src="src/assets/images/fa-solid_box-open.svg" />
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
                    В КОРЗИНУ <img src="src\assets\images\basket.svg" alt="" />
                </button>
            </div>
        </div>
    );
};

export default CatalogItem;
