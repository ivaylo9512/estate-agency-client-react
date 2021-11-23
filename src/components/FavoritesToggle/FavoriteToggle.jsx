import { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPropertyFavoriteState, addFavorite, removeFavorite } from 'app/slices/toggleFavorite';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const FavoriteToggle = memo(({property}) => {
    const [isFavorite, setIsFavorite] = useState(property.isFavorite);
    const favoriteState = useSelector(getPropertyFavoriteState(property.id));
    const dispatch = useDispatch();

    const toggleFavorite = (property) => {
        if(!isFavorite){
            return dispatch(addFavorite(property.id));
        }
        dispatch(removeFavorite(property.id));
    }

    useEffect(() => {
        if(!favoriteState || favoriteState.isLoading){
            return;
        }

        setIsFavorite(favoriteState.isFavorite)
    },[favoriteState])

    return(
        <button onClick={() => toggleFavorite(property)}>{ 
            favoriteState && favoriteState.isLoading 
                ? <LoadingIndicator />
                : isFavorite 
                    ? 'remove'
                    : 'add'
        }
        </button>
    )

})
export default FavoriteToggle