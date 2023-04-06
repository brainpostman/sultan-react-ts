import { Dispatch, SetStateAction, useState } from 'react';
import { IManufacturerInfo } from '../types/catalogItem';

interface ICareState {
    activeMnfct: Set<string>;
    setActiveMnfct: Dispatch<SetStateAction<Set<string>>>;
    updateMnfctFlags: (item: IManufacturerInfo) => void;
}

const useMnfctState = (): ICareState => {
    const [activeMnfct, setActiveMnfct] = useState<Set<string>>(new Set<string>());

    const updateMnfctFlags = (item: IManufacturerInfo) => {
        let name = item.name;
        const activeSet = new Set(activeMnfct);
        if (activeSet.has(name)) {
            activeSet.delete(name);
        } else {
            activeSet.add(name);
        }
        setActiveMnfct(activeSet);
    };

    return {
        activeMnfct,
        setActiveMnfct,
        updateMnfctFlags,
    };
};

export default useMnfctState;
