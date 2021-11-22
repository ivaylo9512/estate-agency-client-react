import PropertiesSearchForm from "components/PropertiesSearchForm/PropertiesSearchForm"
import PropertiesList from "components/PropertiesList";
import PropertiesPagination from "components/Pagination/PropertiesPagination";
import { getProperties, getPropertiesState, setCurrentProperties } from "app/slices/propertiesPaginationSlice"

const Properties = () => {

    return(
        <section>
            <PropertiesSearchForm />
            <PropertiesList />
            <PropertiesPagination selector={getPropertiesState} setCurrentProperties={setCurrentProperties} getProperties={getProperties} />
        </section>
    )
}
export default Properties