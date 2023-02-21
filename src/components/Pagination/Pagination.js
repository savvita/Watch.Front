import { useEffect, useState } from 'react';
import { Pagination as BPagination, PaginationItem, PaginationLink } from 'reactstrap';

import { selectPage, selectPerPage, setPage, incrementPage, decrementPage } from '../../app/filtersSlice';
import { selectHits } from '../../app/watchesSlice';
import { useSelector, useDispatch } from 'react-redux';

const Pagination = () => {   
    const page = useSelector(selectPage);
    const hits = useSelector(selectHits);
    const perPage = useSelector(selectPerPage);
    
    const [count, setCount] = useState(0);
    const [pages, setPages] = useState([]);
    
    const dispatch = useDispatch();

    const onNextClick = (e) => {
        e.preventDefault();
        if(page < Math.ceil(hits / perPage)) {
            dispatch(incrementPage());
        }
    }

    const onPrevClick = (e) => {
        e.preventDefault();
        if(page > 1) {
            dispatch(decrementPage());
        }
    }

    const onPageClick = (idx) => {
        if(idx >= 1 && idx <= count) {
            dispatch(setPage(idx));
        }
    }

    useEffect(() => {
        setCount(Math.ceil(hits / perPage));
        pages.splice(0, pages.length);

        for (let i = 0; i < Math.ceil(hits / perPage); i++) {
            pages.push(i + 1);
        }

        setPages(pages);
    }, [hits, perPage]);

    return (
        <BPagination className="d-flex justify-content-center">
            { 
                page !== 1 && 
                <PaginationItem>
                    <PaginationLink href="#" previous className="bg-dark text-white rounded-0" onClick={ onPrevClick } />
                </PaginationItem> 
            }
           
            { 
            pages.map((item => 
                <PaginationItem key={ item } active={ item === page }>
                    <PaginationLink href="#" onClick={ (e) => { e.preventDefault(); onPageClick(item); } } className="bg-dark text-white rounded-0">{ item }</PaginationLink>
                </PaginationItem>)) 
            }

            { 
                page < count && 
                <PaginationItem>
                    <PaginationLink href="#" next className="bg-dark text-white rounded-0" onClick={ onNextClick } /> 
                </PaginationItem> 
            }
        </BPagination>
    );
}

export default Pagination;