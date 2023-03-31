import { useState } from 'react';
import { ICareFilter } from '../types/catalogItem';
import deepCopyMap from '../utils/deepCopyMap';

interface ICareState {
    careFilters: Map<string, ICareFilter>;
    activeCareFilters: Set<string>;
    updateCareFilter: (type: string) => void;
}

const useCareState = (defaultCareTypes: Map<string, ICareFilter>): ICareState => {
    const [careFilters, setCareFilters] =
        useState<Map<string, ICareFilter>>(defaultCareTypes);
    const [activeCareFilters, setActiveCareFilters] = useState<Set<string>>(
        new Set<string>()
    );

    const updateCareFilter = (type: string) => {
        const activeFilters = new Set(activeCareFilters);
        const filtersMap = deepCopyMap(careFilters);
        let filter = filtersMap.get(type);
        if (filter) filter.checked = !filter.checked;
        if (activeFilters.has(type)) {
            activeFilters.delete(type);
        } else {
            activeFilters.add(type);
        }
        setActiveCareFilters(activeFilters);
        setCareFilters(filtersMap);
    };

    return { careFilters, activeCareFilters, updateCareFilter };
};

export default useCareState;
