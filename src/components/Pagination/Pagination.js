import { useEffect, useState } from 'react';
import { Pagination as BPagination, PaginationItem, PaginationLink } from 'reactstrap';

const Pagination = ({ hits, perPage, currentPage, onPageClick, onPrevClick, onNextClick }) => {   
    const current = parseInt(currentPage);
    const pagPerPage = parseInt(perPage);
    const count = Math.ceil(hits / pagPerPage);

    const [pages, setPages] = useState([]);

    useEffect(() => {
        pages.splice(0, pages.length);

        for(let i = 0; i < count; i++) {
            pages.push(i + 1);
        }

        setPages(pages);
    }, [ hits, perPage, currentPage, count, pages]);


    return (
        <BPagination className="d-flex justify-content-center">
            <PaginationItem>
                { current !== 1 && <PaginationLink href="#" previous className="bg-dark text-white rounded-0" onClick={ (e) => { e.preventDefault(); onPrevClick && onPrevClick(); } } /> }
            </PaginationItem>

            { pages.map((page => page === current ? <PaginationItem key={ page } active><PaginationLink href="#" onClick={ (e) => { e.preventDefault(); onPageClick && onPageClick(page); } } className="bg-dark text-white rounded-0">{ page }</PaginationLink></PaginationItem> : <PaginationItem key={ page }><PaginationLink href="#" onClick={ (e) => { e.preventDefault(); onPageClick && onPageClick(page); } }  className="bg-dark text-white rounded-0">{ page }</PaginationLink></PaginationItem> )) }
           
            <PaginationItem>
                { current !== count && <PaginationLink href="#" next  className="bg-dark text-white rounded-0" onClick={ (e) => { e.preventDefault(); onNextClick && onNextClick(); } } /> }
            </PaginationItem>
        </BPagination>
    );
}

export default Pagination;