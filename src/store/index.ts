import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import catalogReducer from './reducers/catalogReducer';
import { enableMapSet } from 'immer';

enableMapSet();

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        catalog: catalogReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
