import { describe, it, expect } from 'vitest';
import catalogJson from '../catalog.json';
import { createMnfctrsArr } from './createMnfctrsArr';
import { ICatalogItem } from '../types/catalogItem';

describe('Utility functions testing', () => {
    it('Create a manufacturers list from an item list', () => {
        const items: ICatalogItem[] = catalogJson.slice(0, 4);
        expect(createMnfctrsArr(items)).toEqual([
            { name: 'ЮНИЛЕВЕР', amount: 2 },
            { name: 'ПЕРВОЕ РЕШЕНИЕ', amount: 1 },
            { name: 'АМС МЕДИА', amount: 1 },
        ]);
    });
});
