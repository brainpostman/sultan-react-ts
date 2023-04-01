import { useMemo } from 'react';
import { ICatalogItem } from '../types/catalogItem';

const useItemFieldFilter = (
    nameQuery: string,
    codeQuery: string,
    mnfctQuery: string,
    brandQuery: string,
    descrQuery: string,
    initialItemArr: ICatalogItem[]
): ICatalogItem[] => {
    const filteredByNames = useMemo(() => {
        return [...initialItemArr].filter((item) =>
            item.name.toLowerCase().includes(nameQuery.toLowerCase())
        );
    }, [nameQuery, initialItemArr]);

    const filteredByCodes = useMemo(() => {
        return [...filteredByNames].filter((item) =>
            item.code.toLowerCase().includes(codeQuery.toLowerCase())
        );
    }, [codeQuery, filteredByNames]);

    const filteredByMnfct = useMemo(() => {
        return [...filteredByCodes].filter((item) =>
            item.mnfct.toLowerCase().includes(mnfctQuery.toLowerCase())
        );
    }, [mnfctQuery, filteredByCodes]);

    const filteredByBrand = useMemo(() => {
        return [...filteredByMnfct].filter((item) =>
            item.brand.toLowerCase().includes(brandQuery.toLowerCase())
        );
    }, [brandQuery, filteredByMnfct]);

    const filteredByDescr = useMemo(() => {
        return [...filteredByBrand].filter((item) =>
            item.descr.toLowerCase().includes(descrQuery.toLowerCase())
        );
    }, [descrQuery, filteredByBrand]);

    return filteredByDescr;
};

export default useItemFieldFilter;
