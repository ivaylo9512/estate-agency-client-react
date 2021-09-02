import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { getUserPropertiesState, getUserProperties, resetUserPropertiesState, setCurrentUserProperties } from "app/slices/userPropertiesPaginationSlice";
import { useEffect } from "react";
import PropertiesPagination from "./PropertiesPagination";
import LoadingIndicator from "./LoadingIndicator/LoadingIndicator";

const UserPropertiesList = () => {
    const dispatch = useDispatch();
    const {query, data: {currentProperties, isLoading}} = useSelector(getUserPropertiesState);

    useEffect(() => {
        dispatch(getUserProperties({...query, pages: 1}));

        return () => dispatch(resetUserPropertiesState());
    }, [])

    return(
        <div>
            {currentProperties &&
                <>
                    { isLoading 
                        ? <LoadingIndicator />
                        : currentProperties.map(property => 
                            <div key={property.id}>
                                {property.id}
                                {property.name}
                            </div>
                    )}
                    <PropertiesPagination selector={getUserPropertiesState} getProperties={getUserProperties} setCurrentProperties={setCurrentUserProperties} />
                </>
            }
        </div>
    )
}
export default UserPropertiesList