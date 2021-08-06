import { useSelector, useDispatch } from "react-redux"
import { getPropertiesData, getProperties, getPropertiesState, setCurrentProperties } from "../app/slices/propertiesPaginationSlice"
import LoadingIndicator from "../components/LoadingIndicator";
import PropertiesPagination from "../components/PropertiesPagination";
import { getToggleFavoriteState, addFavorite, removeFavorite } from "../app/slices/toggleFavorite";

const PropertiesList = () => {
    const {currentProperties, isInitial, isLoading}  = useSelector(getPropertiesData)
    const favorites = useSelector(getToggleFavoriteState);
    const dispatch = useDispatch();

    const toggleFavorite = (property) => {
        if(!property.isFavorite){
            return dispatch(addFavorite(property.id));
        }
        dispatch(removeFavorite(property.id));
    }

    return(
        <div>
            {!isInitial && 
                <>
                    {!currentProperties 
                        ? <span>No properties found with given search.</span>
                        : <>
                            <div> 
                                {isLoading
                                    ? <LoadingIndicator />
                                    : currentProperties.map(property =>
                                        <div key={property.id}>
                                            {property.id}
                                            {property.price}
                                            <button onClick={() => toggleFavorite(property)}>{
                                                favorites[property.id] 
                                                    ? favorites[property.id].isLoading 
                                                        ? <LoadingIndicator />
                                                        : favorites[property.id].isFavorite 
                                                            ? 'remove'
                                                            : 'add'
                                                    : property.isFavorite ? 'remove' : 'add'
                                            }</button>
                                        </div>
                                    )
                                }
                            </div>
                            <PropertiesPagination selector={getPropertiesState} setCurrentProperties={setCurrentProperties} getProperties={getProperties} />
                        </>
                    }
                </>
            }
        </div>
    )
}
export default PropertiesList