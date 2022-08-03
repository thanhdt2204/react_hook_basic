import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = (props) => {

    if (!props.isLoggedIn) {
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

const mapStateReduxToPropsOfHome = (state) => {
    return { isLoggedIn: state.isLoggedIn }
}

export default connect(mapStateReduxToPropsOfHome, null)(Home);