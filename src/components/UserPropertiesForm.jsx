import useInput from "../hooks/useInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { getUserPropertiesQuery, resetUserPropertiesState, getUserProperties } from "../app/slices/userPropertiesPaginationSlice";
const UserPropertiesForm = () => {
    const dispatch = useDispatch();
    const query = useSelector(getUserPropertiesQuery);

    const [name, nameInput] = useInput({
        name: 'name'
    })


    const submit = (e) => {
        e.preventDefault();
        dispatch(resetUserPropertiesState());
        dispatch(getUserProperties({...query, name, pages: 1}));
    }

    return(
        <div>
            <form onSubmit={submit}>
            <FontAwesomeIcon icon={faSearch}/>
            {nameInput}
            <button>enter</button>
            </form>
        </div>
    )
} 
export default UserPropertiesForm