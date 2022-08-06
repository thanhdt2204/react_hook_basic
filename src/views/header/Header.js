import { useContext } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import StoreContext from "../../context/StoreContext";
import userAction from '../../store/actions/userAction';
import './Header.scss';

const Header = () => {

    const history = useHistory();
    const { dispatch } = useContext(StoreContext);

    const handleLogout = (e) => {
        dispatch(userAction.logoutSuccessAction());
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

export default Header;