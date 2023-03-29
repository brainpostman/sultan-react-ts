import { useMemo } from "react";
import { IShopItem } from "../types/shopItem";

const useMnfctFilter = (items: IShopItem[], activeMnfct: Set<string>): IShopItem[] => {
    const result = useMemo(() => {
        if (activeMnfct.size === 0) {
            return items;
        }
        let filteredItems: IShopItem[] = [];
        for (let item of items) {
            for (let mnfct of activeMnfct) {
                if (item.mnfct === mnfct) {
                    filteredItems.push(item);
                    break;
                }
            }
        }
        return filteredItems;
    }, [items, activeMnfct])
    return result;
}

export default useMnfctFilter;