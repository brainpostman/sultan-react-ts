import { useMemo } from 'react';
import { ICatalogItem } from '../types/catalogItem';
import { sortByPrice, sortByName } from '../utils/catalogSortCallbacks';

const useCareFilter = (
    items: ICatalogItem[],
    sortType: string,
    sortDirection: string
): ICatalogItem[] => {
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
};

export default useCareFilter;
