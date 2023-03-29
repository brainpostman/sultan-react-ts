import { IShopItem } from "../types/shopItem";

const sortByPrice = (a: IShopItem, b: IShopItem): number => {
    return a.price - b.price;
}

const sortByName = (a: IShopItem, b: IShopItem): number => {
    return a.name.localeCompare(b.name);
}



export {sortByPrice, sortByName};