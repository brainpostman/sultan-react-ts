import { ICatalogItem } from '../types/catalogItem';

const sortByPrice = (a: ICatalogItem, b: ICatalogItem): number => {
    return a.price - b.price;
};

const sortByName = (a: ICatalogItem, b: ICatalogItem): number => {
    return a.name.localeCompare(b.name);
};

export { sortByPrice, sortByName };
