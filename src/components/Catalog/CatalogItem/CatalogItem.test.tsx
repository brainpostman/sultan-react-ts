import { actions } from '../../../store/reducers/cartReducer';
import { describe, it, vi, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import catalogJson from '../../../catalog.json';
import { ICatalogItem } from '../../../types/catalogItem';
import * as customReduxHooks from '../../../hooks/ReduxHooks';
import CatalogItem from './CatalogItem';

const item: ICatalogItem = catalogJson[0];

vi.mock('../../../hooks/ReduxHooks');
vi.mock('../../../store/reducers/cartReducer');

describe('CatalogItem functionality testing', () => {
    it('addToCart action dispatches on CatalogItem "В КОРЗИНУ" button click', () => {
        const mockedDispatch = vi.spyOn(customReduxHooks, 'useAppDispatch');
        const mockedAddToCart = vi.spyOn(actions, 'addToCart');
        const dispatch = vi.fn();
        mockedDispatch.mockReturnValue(dispatch);
        render(
            <MemoryRouter>
                <CatalogItem item={item} />
            </MemoryRouter>
        );
        const btn = screen.getByRole('button');
        fireEvent.click(btn);
        expect(dispatch).toHaveBeenCalled();
        expect(mockedAddToCart).toHaveBeenCalled();
    });
});
