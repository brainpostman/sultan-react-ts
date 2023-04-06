import { IManufacturerInfo, ICatalogItem } from '../types/catalogItem';

export function createMnfctrsArr(catalog: ICatalogItem[]): IManufacturerInfo[] {
    const tempMap = new Map<string, number>();

    for (let item of catalog) {
        if (tempMap.has(item.mnfct)) {
            tempMap.set(item.mnfct, (tempMap.get(item.mnfct) || 1) + 1);
        } else {
            tempMap.set(item.mnfct, 1);
        }
    }

    const manufacturersArr: IManufacturerInfo[] = [];

    for (let [name, amount] of tempMap.entries()) {
        manufacturersArr.push({ name, amount });
    }

    return manufacturersArr;
}
