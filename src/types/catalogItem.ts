export interface ICatalogItem {
    img: string;
    name: string;
    unit: string;
    amount: number;
    code: string;
    mnfct: string;
    brand: string;
    descr: string;
    price: number;
    types: ICareTypes;
    [key: string]: unknown;
}

export class CatalogItem implements ICatalogItem {
    [key: string]: unknown;
    img = '';
    name = '';
    unit = '';
    amount = 0;
    code = '';
    mnfct = '';
    brand = '';
    descr = '';
    price = 0;
    types = new CareTypes();
}

export interface ICareTypes {
    body: boolean;
    hands: boolean;
    legs: boolean;
    face: boolean;
    hair: boolean;
    suntan: boolean;
    shave: boolean;
    gift: boolean;
    hygiene: boolean;
    mouth: boolean;
    paper: boolean;
    [key: string]: boolean;
}

export class CareTypes implements ICareTypes {
    [key: string]: boolean;
    body = false;
    hands = false;
    legs = false;
    face = false;
    hair = false;
    suntan = false;
    shave = false;
    gift = false;
    hygiene = false;
    mouth = false;
    paper = false;
}

export interface ICareFilters {
    body: ICareFilter;
    hands: ICareFilter;
    legs: ICareFilter;
    face: ICareFilter;
    hair: ICareFilter;
    suntan: ICareFilter;
    shave: ICareFilter;
    gift: ICareFilter;
    hygiene: ICareFilter;
    mouth: ICareFilter;
    paper: ICareFilter;
    [key: string]: ICareFilter;
}

export interface ICareFilter {
    type: string;
    value: string;
    checked: boolean;
}

export class CareFilters implements ICareFilters {
    body = { type: 'body', value: 'Уход за телом', checked: false };
    hands = { type: 'hands', value: 'Уход за руками', checked: false };
    legs = { type: 'legs', value: 'Уход за ногами', checked: false };
    face = { type: 'face', value: 'Уход за лицом', checked: false };
    hair = { type: 'hair', value: 'Уход за волосами', checked: false };
    suntan = { type: 'suntan', value: 'Средства для загара', checked: false };
    shave = { type: 'shave', value: 'Средства для бритья', checked: false };
    gift = { type: 'gift', value: 'Подарочные наборы', checked: false };
    hygiene = {
        type: 'hygiene',
        value: 'Гигиеническая продукция',
        checked: false,
    };
    mouth = { type: 'mouth', value: 'Гигиена полости рта', checked: false };
    paper = { type: 'paper', value: 'Бумажная продукция', checked: false };
    [key: string]: ICareFilter;
}

export interface IManufacturerInfo {
    name: string;
    amount: number;
    checked: boolean;
}

export interface ICatalogState {
    items: Map<string, ICatalogItem>;
}

export enum CatalogActionTypes {
    UPDATE_CATALOG = 'UPDATE_CATALOG',
}

interface UpdateCatalogAction {
    type: CatalogActionTypes.UPDATE_CATALOG;
    payload: Map<string, ICatalogItem>;
}

export type CatalogAction = UpdateCatalogAction;
