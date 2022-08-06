import { usePersistedReducer } from '../store/hooks';
import StoreContext from "./StoreContext";

const StoreContextProvider = (props) => {

    const { state, dispatch } = usePersistedReducer();

    return (
        <StoreContext.Provider value={
            { state, dispatch }
        }>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;