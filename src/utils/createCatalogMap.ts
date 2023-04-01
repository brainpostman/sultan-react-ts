import { ICatalogItem } from '../types/catalogItem';
import catalogJson from '../catalog.json?raw';

export function createCatalogMap(): Map<string, ICatalogItem> {
    if (!localStorage.getItem('catalog')) {
        localStorage.setItem('catalog', catalogJson);
    }
    let catalogStr = localStorage.getItem('catalog');
    let catalogArr: ICatalogItem[] = [];
    if (catalogStr) {
        catalogArr = JSON.parse(catalogStr);
    }
    let catalogMap = new Map<string, ICatalogItem>();
    for (let item of catalogArr) {
        catalogMap.set(item.code, item);
    }

    return catalogMap;
}
