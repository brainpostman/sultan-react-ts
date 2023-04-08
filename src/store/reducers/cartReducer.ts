import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem, ICartState } from '../../types/cartItem';
import { createCartObject } from '../../utils/createCartObject';
import { ICatalogItem } from '../../types/catalogItem';

const initialState: ICartState = {
    items: new Map<string, ICartItem>(),
    sum: 0,
    quantity: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICatalogItem>) => {
            let item = createCartObject(action.payload);
            let map = state.items;
            let existingItem = map.get(item.code);
            if (existingItem) {
                existingItem.inCart = existingItem.inCart + 1;
            } else {
                map.set(item.code, item);
            }
            state.sum += item.price;
            state.quantity += 1;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            let itemCode = action.payload;
            let map = state.items;
            let itemPrice = 0;
            let quantity = 0;
            let existingItem = map.get(itemCode);
            if (existingItem) {
                itemPrice = existingItem.price;
                quantity = existingItem.inCart;
                map.delete(itemCode);
            }
            state.sum = Math.abs(state.sum - itemPrice * quantity);
            state.quantity = Math.abs(state.quantity - quantity);
        },
        incrementItem: (state, action: PayloadAction<string>) => {
            let itemCode = action.payload;
            let map = state.items;
            let itemPrice = 0;
            let quantity = 0;
            let existingItem = map.get(itemCode);
            if (existingItem) {
                existingItem.inCart = existingItem.inCart + 1;
                itemPrice = existingItem.price;
                quantity = 1;
            }
            state.sum += itemPrice;
            state.quantity += quantity;
        },
        decrementItem: (state, action: PayloadAction<string>) => {
            let itemCode = action.payload;
            let map = state.items;
            let itemPrice = 0;
            let quantity = 0;
            let existingItem = map.get(itemCode);
            if (existingItem) {
                let numInCart = existingItem.inCart;
                itemPrice = existingItem.price;
                quantity = 1;
                switch (numInCart) {
                    case 1:
                        map.delete(itemCode);
                        break;
                    default:
                        existingItem.inCart = existingItem.inCart - 1;
                        break;
                }
            }
            state.sum = Math.abs(state.sum - itemPrice);
            state.quantity = Math.abs(state.quantity - quantity);
        },
        changeItemQuantity: (
            state,
            action: PayloadAction<{ itemCode: string; quantity: number }>
        ) => {
            let itemCode = action.payload.itemCode;
            let quantity = action.payload.quantity;
            let map = state.items;
            let priceDifference = 0;
            let quantityDifference = 0;
            let existingItem = map.get(itemCode);
            if (existingItem) {
                quantityDifference = quantity - existingItem.inCart;
                priceDifference = existingItem.price * quantityDifference;
                switch (quantity) {
                    case 0:
                        map.delete(itemCode);
                        break;
                    default:
                        existingItem.inCart = quantity;
                        break;
                }
            }
            state.sum = Math.abs(state.sum + priceDifference);
            state.quantity = Math.abs(state.quantity + quantityDifference);
        },
        emptyCart: (state) => {
            state.items = new Map<string, ICartItem>();
            state.sum = 0;
            state.quantity = 0;
        },
    },
});

export default cartSlice.reducer;
