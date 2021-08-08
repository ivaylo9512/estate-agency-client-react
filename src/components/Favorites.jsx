import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { getFavoritesState, getFavorites } from "../app/slices/favoritesSlice";
import { useEffect } from "react";

const Favorites = () => {
    const dispatch = useDispatch();
    const { isLoading, favorites } = useSelector(getFavoritesState);
    
    useEffect(() => {
        dispatch(getFavorites());
    },[])

    return(
        <div>
            {favorites.map(favorite => 
                <div key={favorite.id}>
                    {favorite.id}
                </div>
            )}
        </div>
    )
}
export default Favorites