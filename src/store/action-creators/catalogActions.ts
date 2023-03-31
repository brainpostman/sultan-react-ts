import { CatalogActionTypes, ICatalogItem } from '../../types/catalogItem';

export const updateCatalog = (items: Map<string, ICatalogItem>) => {
    return { type: CatalogActionTypes.UPDATE_CATALOG, payload: items };
};
