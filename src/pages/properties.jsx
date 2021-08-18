import PropertiesSearchForm from "../components/PropertiesSearchForm"
import PropertiesList from "../components/PropertiesList";

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