import React from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import userApi from '../../services/userService';
import './Login.scss';
import userAction from '../../store/actions/userAction';
import { withRouter } from "react-router";
import { message } from '../../utils/constant';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'thanhdoan@gmail.com',
            password: '123456'
        }
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    handleChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    handleAdd = async (e) => {
        e.preventDefault();
        await userApi.login({ email: this.state.email, password: this.state.password })
            .then((response) => {
                if (response.status === 500) {
                    toast.error(message.INTERNAL_SERVER_ERROR);
                } else if (response.status === 400) {
                    toast.warn(response.status + ': ' + response.message);
                } else {
                    this.props.loginSuccess(response.data);
                    this.props.history.push("/");
                }
            });
    };

    render() {
        return (
            <>
                <div className="login_container">
                    <div className="screen">
                        <div className="screen__content">
                            <form className="login">
                                <div className="login__field">
                                    <input onChange={this.handleChangeEmail} type="email" className="login__input"
                                        placeholder="Email" autoComplete='true' value={this.state.email} />
                                </div>
                                <div className="login__field">
                                    <input onChange={this.handleChangePassword} type="password" className="login__input"
                                        placeholder="Password" autoComplete='true' value={this.state.password} />
                                </div>
                                <button onClick={this.handleAdd} className="button login__submit">
                                    <span className="button__text">Log In</span>
                                </button>
                            </form>
                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4"></span>
                            <span className="screen__background__shape screen__background__shape3"></span>
                            <span className="screen__background__shape screen__background__shape2"></span>
                            <span className="screen__background__shape screen__background__shape1"></span>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }

}

const mapDispatchReduxToPropsOfLogin = (dispatch) => {
    return {
        loginSuccess: (token) => dispatch(userAction.loginSuccessAction(token)),
    }
}

export default connect(null, mapDispatchReduxToPropsOfLogin)(withRouter(Login));