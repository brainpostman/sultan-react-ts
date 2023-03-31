import { Dispatch } from 'redux';
import { CartAction, CartActionTypes, ICartItem } from '../../types/cartItem';
import { ICatalogItem } from '../../types/catalogItem';
import { createCartObject } from '../../utils/createCartObject';

export const addItem = (item: ICatalogItem) => {
    let cartItem = createCartObject(item);
    return { type: CartActionTypes.ADD_TO_CART, payload: cartItem };
};

export const removeItem = (itemCode: string) => {
    return { type: CartActionTypes.REMOVE_FROM_CART, payload: itemCode };
};

export const incrementItem = (itemCode: string) => {
    return { type: CartActionTypes.INCREMENT_ITEM, payload: itemCode };
};

export const decrementItem = (itemCode: string) => {
    return { type: CartActionTypes.DECREMENT_ITEM, payload: itemCode };
};

export const changeItemQuantity = (itemCode: string, quantity: number) => {
    return {
        type: CartActionTypes.CHANGE_ITEM_QUANTITY,
        payload: { itemCode, quantity },
    };
};

export const emptyCart = () => {
    return {
        type: CartActionTypes.EMPTY_CART,
    };
};
