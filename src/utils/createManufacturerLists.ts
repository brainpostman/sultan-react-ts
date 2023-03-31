import { IManufacturerInfo, ICatalogItem } from '../types/catalogItem';

export function createManufacturerMap(
    catalog: ICatalogItem[]
): Map<string, IManufacturerInfo> {
    const tempMap = new Map<string, number>();

    for (let item of catalog) {
        if (tempMap.has(item.mnfct)) {
            tempMap.set(item.mnfct, (tempMap.get(item.mnfct) || 1) + 1);
        } else {
            tempMap.set(item.mnfct, 1);
        }
    }

    const manufacturersMap = new Map<string, IManufacturerInfo>();

    for (let [name, amount] of tempMap.entries()) {
        manufacturersMap.set(name, { name, amount, checked: false });
    }

    return manufacturersMap;
}
