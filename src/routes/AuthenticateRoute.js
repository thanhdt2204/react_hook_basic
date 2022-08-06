import { useContext } from 'react';
import { Redirect, Route } from "react-router-dom";
import StoreContext from '../context/StoreContext';

export function AuthenticateRoute({ component: Component, ...rest }) {
    const { state } = useContext(StoreContext);
    const isLoggedIn = state.isLoggedIn;
    console.log('Check login ', isLoggedIn)
    return (
        <Route
            {...rest}
            render={(props) => (
                isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
            )}
        />
    );
}