import PropertySearchForm from "../components/PropertySearchForm"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { getProperties, resetState } from "../app/slicers/propertiesPaginationSlicer";
import LoadingIndicator from "../components/LoadingIndicator";

const Properties = () => {
    const [page, setPage] = useState(1);
    const { data: { properties, pages, isInitial, isLoading }, query } = useSelector(state => state.propertiesPagination)
    const dispatch = useDispatch();
    
    const resetStateNow = () => {
        dispatch(resetState())
    }

    const changePage = (nextPage) => {
        if(isLoading){
            return;
        }

        if(properties[nextPage - 1]){
            return setPage(nextPage);
        }

        const pages = nextPage - page; 
        dispatch(getProperties({...query, pages, minPrice: null}))
        setPage(nextPage)
    }

    return(
        <section>
            <PropertySearchForm />
            <button onClick={resetStateNow}>reset</button>
            {!isInitial && 
                <>
                    {properties.length == 0 ?
                        <span>No properties found with given search.</span>
                        :
                        <div>
                            <div> 
                                {isLoading
                                    ? <LoadingIndicator />
                                    : properties[page - 1].map(property =>
                                        <div key={property.id}>
                                            {property.id}
                                            {property.price}
                                        </div>
                                    )
                                }
                            </div>
                            {page > 1 &&
                                <>
                                    <button onClick={() => changePage(1)}>{'<<'}</button>
                                    <button onClick={() => changePage(page + 1)}>prev</button>
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
                    }
                </>
            }
        </section>
    )
}
export default Properties