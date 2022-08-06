import { useContext } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { userIsAuthenticated, userIsNotAuthenticated } from '../auth';
import StoreContext from "../context/StoreContext";
import UserContextProvider from '../context/UserContextProvider';
import About from './about/About';
import './App.scss';
import Login from './authentication/Login';
import NotFound from './error/NotFound';
import Header from './header/Header';
import Home from './home/Home';
import AddUser from './users/AddUser';
import User from './users/User';

const App = () => {

  const { state } = useContext(StoreContext);

  return (
    <BrowserRouter>
      {state.isLoggedIn && <Header />}
      <UserContextProvider>
        < Switch >
          <Route path="/" exact component={Home} />
          <Route path="/about" component={userIsAuthenticated(About)} />
          <Route path="/user" exact component={userIsAuthenticated(User)} />
          <Route path="/user/new" component={userIsAuthenticated(AddUser)} />
          <Route path="/login" component={userIsNotAuthenticated(Login)} />
          <Route path="*" component={NotFound} />
        </Switch >
      </UserContextProvider>
    </BrowserRouter >
  );

}

export default App;
