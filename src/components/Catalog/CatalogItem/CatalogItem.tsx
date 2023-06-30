import { Link } from 'react-router-dom';
import cl from './CatalogItem.module.scss';
import MyImage from '../../UI/MyImage';
import { defaultCareFiltersArr } from '../../../utils/createCareFiltersArr';
import { ICatalogItem } from '../../../types/catalogItem';
import { addToCart } from '../../../store/cartStore';
import { observer } from 'mobx-react-lite';

interface CatalogItemProps {
    item: ICatalogItem;
}

const CatalogItem = observer(({ item }: CatalogItemProps) => {
    return (
        <div className={cl.item} data-testid={`catalog-item-${item.code}`}>
            <MyImage
                src={item.img}
                containerClass={cl.item__image}
                errorClass={cl.item__imgerror}
            />
            <p className={cl.item__quantity}>
                {item.unit === 'мл' ? (
                    <img src='images/whh_bottle.svg' />
                ) : (
                    <img src='images/fa-solid_box-open.svg' />
                )}
                <span>
                    {item.amount} {item.unit}
                </span>
            </p>
            <Link to={`${item.code}`} data-testid={`item-link-${item.code}`}>
                <h2 className={cl.item__title}>
                    <span>{item.brand}</span> {item.name}
                </h2>
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
                </p>
            </div>
            <div className={cl.item__purchase}>
                <span className={cl.item__price}>
                    {String(item.price.toFixed(2)).replace(/\./g, ',').replace(/,00/g, '') + ' ₸'}
                </span>
                <button className={`${cl.btn} ${cl.item__buy}`} onClick={() => addToCart(item)}>
                    В КОРЗИНУ <img src='images/basket.svg' alt='' />
                </button>
            </div>
        </div>
    );
});

export default CatalogItem;
