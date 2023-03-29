import { useMemo } from "react";
import { IShopItem } from "../types/shopItem";

const useCareFilter = (items: IShopItem[], filters: Set<string>) => {
    const sortedItems: IShopItem[] = useMemo(() => {
        let filteredItems = [...items];
        if (filters.size === 0) {
            return items;
        }
        let result: IShopItem[] = [];
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
}

export default useCareFilter;