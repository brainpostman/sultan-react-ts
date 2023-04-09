import { describe, it, vi, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Catalog from './Catalog';
import * as customReduxHooks from '../../hooks/ReduxHooks';
import { ICatalogItem } from '../../types/catalogItem';
import catalogJson from '../../catalog.json';
import { MemoryRouter } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import ItemCard from '../ItemCard/ItemCard';

const catalogMock = new Map<string, ICatalogItem>();
for (let i = 0; i < 4; i++) {
    catalogMock.set(catalogJson[i].code, catalogJson[i]);
}

let catalogEl = (
    <MemoryRouter>
        <Catalog />
    </MemoryRouter>
);

describe('Catalog functionality testing', () => {
    beforeEach(() => {
        vi.mock('../../hooks/ReduxHooks');
        vi.spyOn(customReduxHooks, 'useAppSelector').mockReturnValue({
            items: catalogMock,
            sum: 0,
            quantity: 0,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Carefilter "active" className toggles onClick in CareFilter component', () => {
        render(catalogEl);
        const filter = screen.getAllByTestId('care-filter-body')[0];
        fireEvent.click(filter);
        expect(filter.className).toContain('_careTypeTop__item_active');
    });

    it('CatalogItem renders in pagination component', () => {
        render(catalogEl);
        const catalogItem = screen.getAllByTestId(/catalog-item/);
        catalogItem.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
    });
    it('useSort performs correct sorting, ex. price/ascend', () => {
        render(catalogEl);
        const catalogItem = screen.getAllByRole('heading', { level: 2 });
        console.log(catalogItem[0].innerText);
        expect(catalogItem[0].textContent).toContain('Русские травы');
        expect(catalogItem[catalogItem.length - 1].textContent).toContain('Axe Men');
    });
    it('Carefilter correctly applied to item array, ex. hands', () => {
        render(catalogEl);
        const filter = screen.getAllByTestId('care-filter-hands');
        fireEvent.click(filter[0]);
        const catalogItem = screen.getAllByRole('heading', { level: 2 });
        expect(catalogItem[0].textContent).toContain('Русские травы');
    });
    it('Correct dynamic routing to ItemCard on Link click in Catalog', () => {
        render(
            <MemoryRouter initialEntries={['/catalog']}>
                <Routes>
                    <Route path='catalog/*' element={<Catalog />} />
                    <Route path='catalog/:code' element={<ItemCard />} />
                </Routes>
            </MemoryRouter>
        );
        const catalogLink = screen.getByTestId('item-link-A0000003490');
        fireEvent.click(catalogLink);
        const itemTitle = screen.getByRole('heading', { level: 1 });
        expect(itemTitle.innerHTML).toContain('Крем для рук Ромашково-глицериновый');
    });
});
