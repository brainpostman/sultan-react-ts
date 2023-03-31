import { ICartItem } from '../types/cartItem';
import { ICatalogItem } from '../types/catalogItem';

export function createCartObject({
    img,
    name,
    unit,
    amount,
    code,
    mnfct,
    brand,
    descr,
    price,
    types,
}: ICatalogItem): ICartItem {
    return {
        img,
        name,
        unit,
        amount,
        code,
        mnfct,
        brand,
        descr,
        price,
        inCart: 1,
    };
}
