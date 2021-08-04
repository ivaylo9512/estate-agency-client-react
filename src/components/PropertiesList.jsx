import { useSelector } from "react-redux"
import { getPropertiesData } from "../app/slicers/propertiesPaginationSlicer"
import LoadingIndicator from "../components/LoadingIndicator";
import PropertiesPagination from "../components/PropertiesPagination";

const PropertiesList = () => {
    const {currentProperties, isInitial, isLoading}  = useSelector(getPropertiesData)

    return(
        <div>
            {!isInitial && 
                <>
                    {!currentProperties ?
                        <span>No properties found with given search.</span>
                        :
                        <div>
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
                            <PropertiesPagination />
                        </div>
                    }
                </>
            }
        </div>
    )
}
export default PropertiesList