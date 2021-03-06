import { useSelector, useDispatch } from 'react-redux'
import { getPropertiesData } from 'app/slices/propertiesPaginationSlice'
import LoadingIndicator from './LoadingIndicator/LoadingIndicator';
import { resetFavorites } from 'app/slices/favoritesSlice';
import FavoriteToggle from './FavoritesToggle/FavoriteToggle';
import { useEffect } from 'react';

const PropertiesList = () => {
    const {currentProperties, isInitial, isLoading}  = useSelector(getPropertiesData)
    const dispatch = useDispatch();

    useEffect(() => {
        return () => dispatch(resetFavorites());
    },[])

    return(
        <>
            {!isInitial && (!currentProperties 
                ? <span>No properties found with given search.</span>
                : <div> 
                    {isLoading
                        ? <LoadingIndicator />
                        : currentProperties.map(property =>
                            <div key={property.id}>
                                {property.id}
                                {property.price}
                                <FavoriteToggle property={property}/>
                            </div>
                        )
                    }
                </div>
            )}
        </>
    )
}
export default PropertiesList