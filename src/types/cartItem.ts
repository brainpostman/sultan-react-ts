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
