import { useContext } from 'react';
import { useHistory } from "react-router-dom";
import StoreContext from "../../context/StoreContext";

const NotFound = () => {

    const history = useHistory();
    const { state } = useContext(StoreContext);
    const pageDestination = state.isLoggedIn ? 'home page' : 'login page';

    const handleToHome = () => {
        history.push("/");
    }

    return (
        <div style={{ color: "white", textAlign: "center", marginTop: "260px", fontWeight: "bold" }}>
            <div>Page not found</div>
            <a href='# ' onClick={handleToHome}>Back to {pageDestination}</a>
        </div>
    );

}

export default NotFound;