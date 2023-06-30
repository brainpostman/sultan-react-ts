import { useEffect, useState } from 'react';
import List from '../List';
import cl from './Pagination.module.scss';
import ItemsPerPage from './ItemsPerPage';
import { observer } from 'mobx-react-lite';

interface PaginationProps<T> {
    items: T[];
    className?: string;
    renderItem: (item: T) => React.ReactNode;
}

const Pagination = observer(<T,>({ items, className, renderItem }: PaginationProps<T>) => {
    const [itemsPerPage, setItemsPerPage] = useState(ItemsPerPage.DESKTOP);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        const mediaQueryListNotebook = window.matchMedia('(max-width: 1499px)');
        const mediaQueryListTablet = window.matchMedia('(max-width: 1023.98px)');
        const mediaQueryListMobile = window.matchMedia('(max-width: 615px)');
        adaptPagination();
        function adaptPagination() {
            if (mediaQueryListMobile.matches) {
                setItemsPerPage(ItemsPerPage.MOBILE);
            } else if (mediaQueryListTablet.matches) {
                setItemsPerPage(ItemsPerPage.TABLET);
            } else if (mediaQueryListNotebook.matches) {
                setItemsPerPage(ItemsPerPage.NOTEBOOK);
            } else {
                setItemsPerPage(ItemsPerPage.DESKTOP);
            }
        }
        mediaQueryListNotebook.addEventListener('change', adaptPagination);
        mediaQueryListTablet.addEventListener('change', adaptPagination);
        mediaQueryListMobile.addEventListener('change', adaptPagination);
        return () => {
            mediaQueryListNotebook.removeEventListener('change', adaptPagination);
            mediaQueryListTablet.removeEventListener('change', adaptPagination);
            mediaQueryListMobile.removeEventListener('change', adaptPagination);
        };
    }, []);

    let pageNumbers: number[] = [];

    for (let i = 0; i < pageCount; i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (item: number) => {
        let page = item;
        const newOffset = page * itemsPerPage;
        setItemOffset(newOffset);
        setCurrentPage(page);
        console.log(page, itemOffset);
    };

    const handlePrevClick = () => {
        if (currentPage === 0) return;
        let newPage = currentPage - 1;
        const newOffset = newPage * itemsPerPage;
        setCurrentPage(newPage);
        setItemOffset(newOffset);
    };

    const handleNextClick = () => {
        if (currentPage === pageNumbers.length - 1) return;
        let newPage = currentPage + 1;
        const newOffset = newPage * itemsPerPage;
        setCurrentPage(newPage);
        setItemOffset(newOffset);
    };

    useEffect(() => {
        setItemOffset(0);
        setCurrentPage(0);
    }, [items]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [currentPage]);

    return (
        <div className={cl.pagination__container}>
            <List items={currentItems} renderItem={renderItem} className={className} />
            {!(items.length <= itemsPerPage) && (
                <div className={cl.pagination__controls}>
                    <div
                        className={currentPage === 0 ? cl.arrow_left_inactive : cl.arrow_left}
                        onClick={handlePrevClick}
                    />
                    <div className={cl.pageNumbers}>
                        {pageNumbers.map((item) => {
                            return (
                                <span
                                    className={
                                        item === currentPage
                                            ? cl.pageNumbers__page_active
                                            : cl.pageNumbers__page
                                    }
                                    key={item}
                                    onClick={() => handlePageClick(item)}>
                                    {item + 1}
                                </span>
                            );
                        })}
                    </div>
                    <div
                        className={
                            currentPage === pageNumbers.length - 1
                                ? cl.arrow_right_inactive
                                : cl.arrow_right
                        }
                        onClick={handleNextClick}
                    />
                </div>
            )}
        </div>
    );
});

export default Pagination;
