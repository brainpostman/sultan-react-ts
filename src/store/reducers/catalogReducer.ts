import {
    ICatalogState,
    CatalogAction,
    CatalogActionTypes,
} from '../../types/catalogItem';
import { createCatalogMap } from '../../utils/catalogLocalStorageUpdate';
import catalogJson from '../../catalog.json';

const initialState = {
    items: createCatalogMap(catalogJson),
};

export const catalogReducer = (
    state = initialState,
    action: CatalogAction
): ICatalogState => {
    switch (action.type) {
        case CatalogActionTypes.UPDATE_CATALOG:
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};
