import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICatalogItem } from '../../types/catalogItem';
import { createCatalogMap } from '../../utils/createCatalogMap';

const initialState = {
    items: createCatalogMap(),
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        updateCatalog: (state, action: PayloadAction<Map<string, ICatalogItem>>) => {
            state.items = action.payload;
        },
    },
});

export default catalogSlice.reducer;
