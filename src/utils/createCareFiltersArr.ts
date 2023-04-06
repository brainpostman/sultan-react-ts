import { CareFilters, ICareFilter } from '../types/catalogItem';

export function createCareFiltersArr(): ICareFilter[] {
    let careFiltersObj = new CareFilters();
    let careFiltersArr: ICareFilter[] = [];
    for (let key in careFiltersObj) {
        careFiltersArr.push(careFiltersObj[key]);
    }
    return careFiltersArr;
}

export const defaultCareFiltersArr = createCareFiltersArr();
