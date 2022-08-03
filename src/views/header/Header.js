import { connect } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import userAction from '../../store/actions/userAction';
import './Header.scss';

const Header = (props) => {

    const history = useHistory();

    const handleLogout = (e) => {
        props.logoutSuccess();
        history.push("/login");
    };

    return (
        <div className="topnav">
            <NavLink to="/" activeClassName='active' exact={true}>
                Home
            </NavLink>
            <NavLink to="/user" activeClassName='active'>
                User
            </NavLink>
            <NavLink to="/about" activeClassName='active'>
                About
            </NavLink>
            <button onClick={handleLogout} style={{ fontSize: "17px", padding: "14px 16px" }}>
                Logout<i className="fa fa-sign-out"></i>
            </button>
        </div >
    );

}

const mapDispatchReduxToPropsOfHeader = (dispatch) => {
    return {
        logoutSuccess: () => dispatch(userAction.logoutSuccessAction())
    }
}

export default connect(null, mapDispatchReduxToPropsOfHeader)(Header);