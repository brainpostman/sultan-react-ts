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
}

export class CareFilters implements ICareFilters {
    body: ICareFilter = { type: 'body', value: 'Уход за телом' };
    hands: ICareFilter = { type: 'hands', value: 'Уход за руками' };
    legs: ICareFilter = { type: 'legs', value: 'Уход за ногами' };
    face: ICareFilter = { type: 'face', value: 'Уход за лицом' };
    hair: ICareFilter = { type: 'hair', value: 'Уход за волосами' };
    suntan: ICareFilter = { type: 'suntan', value: 'Средства для загара' };
    shave: ICareFilter = { type: 'shave', value: 'Средства для бритья' };
    gift: ICareFilter = { type: 'gift', value: 'Подарочные наборы' };
    hygiene: ICareFilter = {
        type: 'hygiene',
        value: 'Гигиеническая продукция',
    };
    mouth: ICareFilter = { type: 'mouth', value: 'Гигиена полости рта' };
    paper: ICareFilter = { type: 'paper', value: 'Бумажная продукция' };
    [key: string]: ICareFilter;
}

export interface IManufacturerInfo {
    name: string;
    amount: number;
}

export interface ICatalogState {
    items: Map<string, ICatalogItem>;
}
