import { useHistory } from "react-router-dom";

const NotFound = () => {

    const history = useHistory();

    const handleToHome = () => {
        history.push("/");
    }

    return (
        <div style={{ color: "white", textAlign: "center", marginTop: "260px", fontWeight: "bold" }}>
            <div>Page not found</div>
            <a href='# ' onClick={handleToHome}>Back to home page</a>
        </div>
    );

}

export default NotFound;