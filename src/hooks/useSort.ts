import { useMemo } from "react";
import { IShopItem } from "../types/shopItem";
import { sortByPrice, sortByName } from "../utils/catalogSortCallbacks";

const useCareFilter = (items: IShopItem[], sortType: string, sortDirection: string): IShopItem[] => {
    const sortedItems = useMemo(() => {
        switch (sortType) {
            case 'price':
                if (sortDirection === 'ascend') {
                    return [...items].sort(sortByPrice);
                } else {
                    return [...items].sort(sortByPrice).reverse();
                }
            case 'name':
                if (sortDirection === 'ascend') {
                    return [...items].sort(sortByName);
                } else {
                    return [...items].sort(sortByName).reverse();
                }
            default:
                return items;
        }
    }, [items, sortType, sortDirection]);
    return sortedItems;
}

export default useCareFilter;