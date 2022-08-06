import { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import StoreContext from "../../context/StoreContext";
import userApi from '../../services/userService';
import userAction from '../../store/actions/userAction';
import { message } from '../../utils/constant';
import './Login.scss';

const Login = () => {

    const history = useHistory();
    const [email, setEmail] = useState('thanhdoan@gmail.com');
    const [password, setPassword] = useState('123456');
    const { dispatch } = useContext(StoreContext);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        await userApi.login({ email, password })
            .then((response) => {
                if (response.status === 500) {
                    toast.error(message.INTERNAL_SERVER_ERROR);
                } else if (response.status === 400) {
                    toast.warn(response.status + ': ' + response.message);
                } else {
                    dispatch(userAction.loginSuccessAction(response.data));
                    history.push("/");
                }
            });
    };

    return (
        <>
            <div className="login_container">
                <div className="screen">
                    <div className="screen__content">
                        <form className="login">
                            <div className="login__field">
                                <input onChange={handleChangeEmail} type="email" className="login__input"
                                    placeholder="Email" autoComplete='true' value={email} />
                            </div>
                            <div className="login__field">
                                <input onChange={handleChangePassword} type="password" className="login__input"
                                    placeholder="Password" autoComplete='true' value={password} />
                            </div>
                            <button onClick={handleAdd} className="button login__submit">
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

export default Login;