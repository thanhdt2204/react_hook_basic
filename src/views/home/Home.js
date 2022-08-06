import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import StoreContext from "../../context/StoreContext";

const Home = () => {

    const { state } = useContext(StoreContext);

    if (!state.isLoggedIn) {
        return (
            <Redirect to="/login" />
        );
    } else {
        return (
            <div style={{ color: "white", textAlign: "center", marginTop: "260px", fontWeight: "bold" }}>
                Welcome To Sample React Project
            </div>
        );
    }

}

export default Home;