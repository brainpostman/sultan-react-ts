import {
    ICatalogState,
    CatalogAction,
    CatalogActionTypes,
} from '../../types/catalogItem';
import { createCatalogMap } from '../../utils/createCatalogMap';

const initialState = {
    items: createCatalogMap(),
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
