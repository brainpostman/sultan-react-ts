import { useMemo } from 'react';
import { ICatalogItem } from '../types/catalogItem';

const useCareFilter = (items: ICatalogItem[], filters: Set<string>) => {
    const sortedItems: ICatalogItem[] = useMemo(() => {
        let filteredItems = [...items];
        if (filters.size === 0) {
            return items;
        }
        let result: ICatalogItem[] = [];
        for (let item of filteredItems) {
            for (let filter of filters) {
                if (item.types[filter]) {
                    result.push(item);
                    break;
                }
            }
        }
        return result;
    }, [filters, items]);
    return sortedItems;
};

export default useCareFilter;
