export interface ICartItem {
    img: string;
    name: string;
    unit: string;
    amount: number;
    code: string;
    mnfct: string;
    brand: string;
    descr: string;
    price: number;
    inCart: number;
}

export interface ICartState {
    items: Map<string, ICartItem>;
    sum: number;
    quantity: number;
}

export enum CartActionTypes {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    INCREMENT_ITEM = 'INCREMENT_ITEM',
    DECREMENT_ITEM = 'DECREMENT_ITEM',
    CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY',
    EMPTY_CART = 'EMPTY_CART',
}

interface AddToCartAction {
    type: CartActionTypes.ADD_TO_CART;
    payload: ICartItem;
}

interface RemoveFromCartAction {
    type: CartActionTypes.REMOVE_FROM_CART;
    payload: string;
}

interface IncrementItemAction {
    type: CartActionTypes.INCREMENT_ITEM;
    payload: string;
}

interface DecrementItemAction {
    type: CartActionTypes.DECREMENT_ITEM;
    payload: string;
}

interface ChangeItemQuantityAction {
    type: CartActionTypes.CHANGE_ITEM_QUANTITY;
    payload: { itemCode: string; quantity: number };
}

interface EmptyCartAction {
    type: CartActionTypes.EMPTY_CART;
    payload: null;
}

export type CartAction =
    | AddToCartAction
    | RemoveFromCartAction
    | IncrementItemAction
    | DecrementItemAction
    | ChangeItemQuantityAction
    | EmptyCartAction;
