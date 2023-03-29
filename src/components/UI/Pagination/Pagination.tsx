import { useEffect, useState } from "react";
import List from "../List";
import cl from './Pagination.module.scss';

interface PaginationProps<T> {
    items: T[];
    className?: string;
    renderItem: (item: T) => React.ReactNode;
    itemsPerPage: number;
    visiblePages: number;
}

export default function Pagination<T,>({ items, className, renderItem, itemsPerPage }: PaginationProps<T>) {

    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

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
        setCurrentPage(newPage)
        setItemOffset(newOffset);
    }

    const handleNextClick = () => {
        if (currentPage === pageNumbers.length - 1) return;
        let newPage = currentPage + 1;
        const newOffset = newPage * itemsPerPage;
        setCurrentPage(newPage)
        setItemOffset(newOffset);
    }

    const resetPagination = () => {
        setItemOffset(0);
        setCurrentPage(0);
    }

    useEffect(() => {
        resetPagination();
    }, [items])

    return (
        <div className={cl.pagination__container}>
            <List
                items={currentItems}
                renderItem={renderItem}
                className={className}
            />
            {!(items.length <= itemsPerPage) &&
                <div className={cl.pagination__controls}>
                    <div
                        className={(currentPage === 0) ? cl.arrow_left_inactive : cl.arrow_left}
                        onClick={handlePrevClick} />
                    <div className={cl.pageNumbers}>
                        {pageNumbers.map(item => {
                            return <span
                                className={(item === currentPage) ? cl.pageNumbers__page_active : cl.pageNumbers__page}
                                key={item}
                                onClick={() => handlePageClick(item)}>
                                {item + 1}
                            </span>
                        })}
                    </div>
                    <div
                        className={(currentPage === pageNumbers.length - 1) ? cl.arrow_right_inactive : cl.arrow_right}
                        onClick={handleNextClick} />
                </div>}
        </div>
    )
}