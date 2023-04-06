import { useState } from 'react';

interface ICareState {
    activeCareFilters: Set<string>;
    setActiveCareFilters: React.Dispatch<React.SetStateAction<Set<string>>>;
    updateCareFilter: (type: string) => void;
}

const useCareState = (): ICareState => {
    const [activeCareFilters, setActiveCareFilters] = useState<Set<string>>(new Set<string>());

    const updateCareFilter = (type: string) => {
        const activeFilters = new Set(activeCareFilters);
        if (activeFilters.has(type)) {
            activeFilters.delete(type);
        } else {
            activeFilters.add(type);
        }
        setActiveCareFilters(activeFilters);
    };

    return { activeCareFilters, setActiveCareFilters, updateCareFilter };
};

export default useCareState;
