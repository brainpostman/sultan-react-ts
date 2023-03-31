import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { catalogReducer } from './catalogReducer';

export const rootReducer = combineReducers({
    cart: cartReducer,
    catalog: catalogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
