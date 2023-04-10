import { describe, it, vi, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import * as customReduxHooks from '../hooks/ReduxHooks';
import Cart from '../components/Cart/Cart';
import catalogJson from '../catalog.json';
import { ICartItem } from '../types/cartItem';
import { createCartObject } from '../utils/createCartObject';
import { actions } from '../store/reducers/cartReducer';

const cartMock = new Map<string, ICartItem>();
for (let i = 0; i < 2; i++) {
    cartMock.set(catalogJson[i].code, createCartObject(catalogJson[i]));
}

vi.mock('../../hooks/ReduxHooks');
vi.mock('../../store/reducers/cartReducer');
vi.spyOn(customReduxHooks, 'useAppSelector').mockReturnValue({
    items: cartMock,
    sum: 613.48,
});
const mockedDispatch = vi.spyOn(customReduxHooks, 'useAppDispatch');

describe('Cart functionality testing', () => {
    it('Modal element shows on clicking finish order, cart is emptied', () => {
        const dispatch = vi.fn();
        mockedDispatch.mockReturnValue(dispatch);
        const mockedEmptyCart = vi.spyOn(actions, 'emptyCart');
        render(
            <MemoryRouter>
                <Cart />
            </MemoryRouter>
        );
        const btn = screen.getByTestId('handle-order');
        fireEvent.click(btn);
        expect(dispatch).toHaveBeenCalled();
        expect(mockedEmptyCart).toHaveBeenCalled();
        expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
});
