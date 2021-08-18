import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const PropertiesPagination = ({selector, setCurrentProperties, getProperties, pagesPerSlide = 4}) => {
    const {data: { properties, maxPages, isLoading }, query } = useSelector(selector);

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const changePage = (nextPage) => {
        if(isLoading){
            return;
        }

        const currentData = properties[nextPage - 1];
        if(currentData){
            dispatch(setCurrentProperties(currentData));
            return setPage(nextPage);
        }

        const pages = nextPage - page; 
        dispatch(getProperties({...query, pages}))
        setPage(nextPage)
    }

    useEffect(() => {
        setPage(1);
    }, [query.name])

    return(
        <> {maxPages > 0 &&
            <div>
                {page > 1 &&
                    <button onClick={() => changePage(page - 1)}>prev</button>
                }
                <ul>
                    {
                        Array.from({length: page / pagesPerSlide < 1 ? pagesPerSlide : pagesPerSlide + 1 }).map((el, i) => {
                            const slide = Math.floor(page / pagesPerSlide);
                            let pageIndex = slide * pagesPerSlide + i;
                            pageIndex += slide == 0 ? 1 : 0;

                            if(pageIndex <= maxPages){
                                return <li isSelected={pageIndex == page} key={pageIndex} data-testid={`${pageIndex}`} onClick={() => changePage(pageIndex)}>{pageIndex}</li>}
                            }
                        )
                    }
                </ul>
                {page < maxPages &&
                    <button onClick={() => changePage(page + 1)}>next</button>
                }
            </div>
        } </>
    )
}
export default PropertiesPagination