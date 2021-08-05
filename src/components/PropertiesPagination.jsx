import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const PropertiesPagination = ({selector, setCurrentProperties, getProperties}) => {
    const {data: { properties, pages, isLoading }, query } = useSelector(selector);

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const changePage = (nextPage) => {
        if(isLoading){
            return;
        }

        const currentProperties = properties[nextPage - 1];
        if(currentProperties){
            dispatch(setCurrentProperties(currentProperties));
            return setPage(nextPage);
        }

        const pages = nextPage - page; 
        dispatch(getProperties({...query, pages}))
        setPage(nextPage)
    }
    
    return(
        <div>
            {page > 1 &&
                <>
                    <button onClick={() => changePage(1)}>{'<<'}</button>
                    <button onClick={() => changePage(page - 1)}>prev</button>
                </>
            }
            <ul>
                {page + -2 > 0 && <li onClick={() => changePage(page - 2)}>{page - 2}</li>}
                {page + -1 > 0 && <li onClick={() => changePage(page - 1)}>{page - 1}</li>}
                <li>{page}</li>
                {page + 1 <= pages && <li onClick={() => changePage(page + 1)}>{page + 1}</li>}
                {page + 2 <= pages && <li onClick={() => changePage(page + 2)}>{page + 2}</li>}
            </ul>
            {page < pages &&
                <>
                    <button onClick={() => changePage(page + 1)}>next</button>
                    <button onClick={() => changePage(pages)}>{'>>'}</button>
                </>
            }
        </div>
    )
}
export default PropertiesPagination