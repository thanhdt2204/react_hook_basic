import React from 'react';
import './Header.scss';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import userAction from '../../store/actions/userAction';
import { withRouter } from "react-router";

class Header extends React.Component {

    handleLogout = (e) => {
        this.props.logoutSuccess();
        this.props.history.push("/login");
    };

    render() {
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
                <button onClick={this.handleLogout} style={{ fontSize: "17px", padding: "14px 16px" }}>
                    Logout<i className="fa fa-sign-out"></i>
                </button>
            </div >
        );
    }

}

const mapDispatchReduxToPropsOfHeader = (dispatch) => {
    return {
        logoutSuccess: () => dispatch(userAction.logoutSuccessAction())
    }
}

export default connect(null, mapDispatchReduxToPropsOfHeader)(withRouter(Header));