import { Dispatch, SetStateAction, useState } from 'react';
import { IManufacturerInfo } from '../types/catalogItem';
import deepCopyMap from '../utils/deepCopyMap';

interface ICareState {
    manufacturers: Map<string, IManufacturerInfo>;
    setManufacturers: Dispatch<SetStateAction<Map<string, IManufacturerInfo>>>;
    activeMnfct: Set<string>;
    setActiveMnfct: Dispatch<SetStateAction<Set<string>>>;
    updateMnfctFlags: (item: IManufacturerInfo) => void;
}

const useMnfctState = (
    defaultMnfctState: Map<string, IManufacturerInfo>
): ICareState => {
    const [manufacturers, setManufacturers] =
        useState<Map<string, IManufacturerInfo>>(defaultMnfctState);
    const [activeMnfct, setActiveMnfct] = useState<Set<string>>(
        new Set<string>()
    );

    const updateMnfctFlags = (item: IManufacturerInfo) => {
        let name = item.name;
        const mnfctMap = deepCopyMap(manufacturers);
        const activeMap = new Set(activeMnfct);
        let mnfct = mnfctMap.get(item.name);
        if (mnfct) mnfct.checked = !mnfct.checked;
        if (activeMap.has(name)) {
            activeMap.delete(name);
        } else {
            activeMap.add(name);
        }
        setActiveMnfct(activeMap);
        setManufacturers(mnfctMap);
    };

    return {
        manufacturers,
        setManufacturers,
        activeMnfct,
        setActiveMnfct,
        updateMnfctFlags,
    };
};

export default useMnfctState;
