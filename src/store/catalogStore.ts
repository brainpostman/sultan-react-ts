import { action, computed, makeObservable, observable } from 'mobx';
import { ICatalogItem } from '../types/catalogItem';
import { createCatalogMap } from '../utils/createCatalogMap';

export class CatalogStore {
    items: Map<string, ICatalogItem> = createCatalogMap();

    constructor() {
        makeObservable(this, {
            items: observable.deep,
            catalogArr: computed,
            deleteItem: action,
            clearCatalog: action,
            updateItem: action,
            resetCatalog: action,
        });
    }

    get catalogArr() {
        return Array.from(this.items.values());
    }

    getCatalogItem = (itemCode: string) => {
        return this.items.get(itemCode);
    };

    clearCatalog = () => {
        this.items.clear();
    };

    resetCatalog = () => {
        this.items = createCatalogMap();
    };

    deleteItem = (itemCode: string) => {
        this.items.delete(itemCode);
    };

    updateItem = (itemCode: string, newItemProps: ICatalogItem) => {
        this.items.delete(itemCode);
        this.items.set(newItemProps.code, newItemProps);
    };
}

const catalogStore = new CatalogStore();

export default catalogStore;

export const clearCatalog = catalogStore.clearCatalog;
export const deleteItem = catalogStore.deleteItem;
export const updateItem = catalogStore.updateItem;
export const getCatalogItem = catalogStore.getCatalogItem;
export const resetCatalog = catalogStore.resetCatalog;
