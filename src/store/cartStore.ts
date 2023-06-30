import { makeAutoObservable } from 'mobx';
import { ICartItem } from '../types/cartItem';
import { ICatalogItem } from '../types/catalogItem';
import { createCartObject } from '../utils/createCartObject';

export class CartStore {
    items: Map<string, ICartItem>;

    constructor() {
        makeAutoObservable(this);
        this.items = new Map<string, ICartItem>();
    }

    get cartArr() {
        return Array.from(this.items.values());
    }

    get sum() {
        const arr = this.items.values();
        let sum = 0;
        for (let item of arr) {
            console.log(item);
            sum += item.inCart * item.price;
        }
        return sum;
    }

    get quantity() {
        const arr = this.items.values();
        let quantity = 0;
        for (let item of arr) {
            quantity += item.inCart;
        }
        return quantity;
    }

    getCartItem = (itemCode: string) => {
        return this.items.get(itemCode);
    };

    addToCart = (catalogItem: ICatalogItem) => {
        const item = createCartObject(catalogItem);
        let existingItem = this.items.get(item.code);
        if (existingItem) {
            existingItem.inCart = existingItem.inCart + 1;
        } else {
            this.items.set(item.code, item);
        }
    };

    removeFromCart = (itemCode: string) => {
        let existingItem = this.items.get(itemCode);
        if (existingItem) {
            this.items.delete(itemCode);
        }
    };

    incrementItem = (itemCode: string) => {
        let existingItem = this.items.get(itemCode);
        if (existingItem) {
            existingItem.inCart = existingItem.inCart + 1;
        }
    };

    decrementItem = (itemCode: string) => {
        let existingItem = this.items.get(itemCode);
        if (existingItem) {
            let numInCart = existingItem.inCart;
            switch (numInCart) {
                case 1:
                    this.items.delete(itemCode);
                    break;
                default:
                    existingItem.inCart = existingItem.inCart - 1;
                    break;
            }
        }
    };

    changeItemQuantity = (itemCode: string, quantity: number) => {
        let existingItem = this.items.get(itemCode);
        if (existingItem) {
            switch (quantity) {
                case 0:
                    this.items.delete(itemCode);
                    break;
                default:
                    existingItem.inCart = quantity;
                    break;
            }
        }
    };

    emptyCart = () => {
        this.items = new Map<string, ICartItem>();
    };
}

const cartStore = new CartStore();

export default cartStore;

export const getCartItem = cartStore.getCartItem;
export const addToCart = cartStore.addToCart;
export const removeFromCart = cartStore.removeFromCart;
export const incrementItem = cartStore.incrementItem;
export const decrementItem = cartStore.decrementItem;
export const changeItemQuantity = cartStore.changeItemQuantity;
export const emptyCart = cartStore.emptyCart;
