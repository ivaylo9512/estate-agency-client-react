import { useSelector } from "react-redux"
import { getPropertiesData, getProperties, getPropertiesState, setCurrentProperties } from "../app/slices/propertiesPaginationSlice"
import LoadingIndicator from "../components/LoadingIndicator";
import PropertiesPagination from "../components/PropertiesPagination";

const PropertiesList = () => {
    const {currentProperties, isInitial, isLoading}  = useSelector(getPropertiesData)

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