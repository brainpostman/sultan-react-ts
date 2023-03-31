import { ICatalogItem } from '../types/catalogItem';
import catalogJson from '../catalog.json?raw';

localStorage.setItem('catalogImgPath', 'src/assets/images/catalog/');

export function getLocalImgPath() {
    const optionalPath = localStorage.getItem('catalogImgPath');
    const catalogImgPath = optionalPath || 'src/assets/images/catalog/';
    return catalogImgPath;
}

export function createCatalogArr(): ICatalogItem[] {
    if (!localStorage.getItem('catalog')) {
        localStorage.setItem('catalog', catalogJson);
    }
    let catalogStr = localStorage.getItem('catalog');
    let catalogArr: ICatalogItem[] = [];
    if (catalogStr) {
        catalogArr = JSON.parse(catalogStr);
    }
    return catalogArr;
}

export function createCatalogMap(
    catalogArr: ICatalogItem[]
): Map<string, ICatalogItem> {
    let catalogMap = new Map<string, ICatalogItem>();
    for (let item of catalogArr) {
        catalogMap.set(item.code, item);
    }

    return catalogMap;
}
