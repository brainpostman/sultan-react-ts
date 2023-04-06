import { CartAction, CartActionTypes, ICartItem, ICartState } from '../../types/cartItem';
import deepCopyMap from '../../utils/deepCopyMap';

const initialState: ICartState = {
    items: new Map<string, ICartItem>(),
    sum: 0,
    quantity: 0,
};

export const cartReducer = (state = initialState, action: CartAction): ICartState => {
    let tempMap = deepCopyMap(state.items);
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART: {
            let item = action.payload;
            let existingItem = tempMap.get(item.code);
            if (existingItem) {
                existingItem.inCart = existingItem.inCart + 1;
            } else {
                tempMap.set(item.code, item);
            }
            return {
                ...state,
                items: tempMap,
                sum: state.sum + item.price,
                quantity: state.quantity + 1,
            };
        }
        case CartActionTypes.REMOVE_FROM_CART: {
            let itemCode = action.payload;
            let itemPrice = 0;
            let itemQuantity = 0;
            let existingItem = tempMap.get(itemCode);
            if (existingItem) {
                itemPrice = existingItem.price;
                itemQuantity = existingItem.inCart;
                tempMap.delete(itemCode);
            }
            return {
                ...state,
                items: tempMap,
                sum: Math.abs(state.sum - itemPrice * itemQuantity),
                quantity: Math.abs(state.quantity - itemQuantity),
            };
        }
        case CartActionTypes.INCREMENT_ITEM: {
            let itemCode = action.payload;
            let itemPrice = 0;
            let quantity = 0;
            let existingItem = tempMap.get(itemCode);
            if (existingItem) {
                existingItem.inCart = existingItem.inCart + 1;
                itemPrice = existingItem.price;
                quantity = 1;
            }

            return {
                ...state,
                items: tempMap,
                sum: state.sum + itemPrice,
                quantity: state.quantity + quantity,
            };
        }
        case CartActionTypes.DECREMENT_ITEM: {
            let itemCode = action.payload;
            let itemPrice = 0;
            let quantity = 0;
            let existingItem = tempMap.get(itemCode);
            if (existingItem) {
                let numInCart = existingItem.inCart;
                itemPrice = existingItem.price;
                quantity = 1;
                switch (numInCart) {
                    case 1:
                        tempMap.delete(itemCode);
                        break;
                    default:
                        existingItem.inCart = existingItem.inCart - 1;
                        break;
                }
            }
            return {
                ...state,
                items: tempMap,
                sum: Math.abs(state.sum - itemPrice),
                quantity: Math.abs(state.quantity - quantity),
            };
        }
        case CartActionTypes.CHANGE_ITEM_QUANTITY: {
            let itemCode = action.payload.itemCode;
            let quantity = action.payload.quantity;
            let priceDifference = 0;
            let quantityDifference = 0;
            let existingItem = tempMap.get(itemCode);
            if (existingItem) {
                quantityDifference = quantity - existingItem.inCart;
                priceDifference = existingItem.price * quantityDifference;
                switch (quantity) {
                    case 0:
                        tempMap.delete(itemCode);
                        break;
                    default:
                        existingItem.inCart = quantity;
                        break;
                }
            }
            return {
                ...state,
                items: tempMap,
                sum: Math.abs(state.sum + priceDifference),
                quantity: Math.abs(state.quantity + quantityDifference),
            };
        }
        case CartActionTypes.EMPTY_CART: {
            return {
                ...state,
                items: new Map<string, ICartItem>(),
                sum: 0,
                quantity: 0,
            };
        }
        default: {
            return state;
        }
    }
};
