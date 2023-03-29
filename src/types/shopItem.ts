export interface IShopItem {
    img: string,
    name: string,
    unit: string,
    amount: number,
    code: string,
    mnfct: string,
    brand: string,
    descr: string,
    price: number,
    types: ICareTypes
}

export interface ICareTypes {
    body: boolean,
    hands: boolean,
    legs: boolean,
    face: boolean,
    hair: boolean,
    suntan: boolean,
    shave: boolean,
    gift: boolean,
    hygiene: boolean,
    mouth: boolean,
    paper: boolean,
    [key: string]: boolean
}

export interface ICareFilters {
    body: ICareType,
    hands: ICareType,
    legs: ICareType,
    face: ICareType,
    hair: ICareType,
    suntan: ICareType,
    shave: ICareType,
    gift: ICareType,
    hygiene: ICareType,
    mouth: ICareType,
    paper: ICareType,
    [key: string]: ICareType
}

export interface ICareType {
    type: string,
    value: string,
    checked: boolean;
}

export const careFiltersObj: ICareFilters = {
    body: { type: 'body', value: 'Уход за телом', checked: false } as ICareType,
    hands: { type: 'hands', value: 'Уход за руками', checked: false } as ICareType,
    legs: { type: 'legs', value: 'Уход за ногами', checked: false } as ICareType,
    face: { type: 'face', value: 'Уход за лицом', checked: false } as ICareType,
    hair: { type: 'hair', value: 'Уход за волосами', checked: false } as ICareType,
    suntan: { type: 'suntan', value: 'Средства для загара', checked: false } as ICareType,
    shave: { type: 'shave', value: 'Средства для бритья', checked: false } as ICareType,
    gift: { type: 'gift', value: 'Подарочные наборы', checked: false } as ICareType,
    hygiene: { type: 'hygiene', value: 'Гигиеническая продукция', checked: false } as ICareType,
    mouth: { type: 'mouth', value: 'Гигиена полости рта', checked: false } as ICareType,
    paper: { type: 'paper', value: 'Бумажная продукция', checked: false } as ICareType
};

export interface IManufacturerInfo {
    name: string;
    amount: number;
    checked: boolean;
}




