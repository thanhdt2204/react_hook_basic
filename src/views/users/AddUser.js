import React from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from "react-router";
import { message } from '../../utils/constant';
import userApi from '../../services/userService';

class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: ''
        }
    }

    handleChangeInput = (e, key) => {
        let copyState = { ...this.state };
        copyState[key] = e.target.value;
        this.setState({
            ...copyState
        });
    };

    handleAdd = async (e) => {
        e.preventDefault();
        await userApi.saveUser({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }).then((response) => {
            if (response.status === 500) {
                toast.error(message.INTERNAL_SERVER_ERROR);
            } else if (response.status === 400) {
                toast.warn(response.status + ': ' + response.message);
            } else {
                this.props.history.push("/user");
            }
        });
    };

    render() {
        return (
            <>
                <div className="container">
                    <div className="table-wrapper">
                        <div className="table-title">Create User</div>
                        <form >
                            <div className="form-group">
                                <label>Email</label>
                                <input onChange={(e) => this.handleChangeInput(e, 'email')} value={this.state.email}
                                    type="email" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label>First Name</label>
                                <input onChange={(e) => this.handleChangeInput(e, 'firstName')} value={this.state.firstName}
                                    type="text" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label>Last Name</label>
                                <input onChange={(e) => this.handleChangeInput(e, 'lastName')} value={this.state.lastName}
                                    type="text" className="form-control" required />
                            </div>

                            <Link to="/user" className='btn btn-default'>Cancel</Link>&nbsp;
                            <input onClick={(e) => this.handleAdd(e)} className='btn btn-success' type="submit" value="Submit" />
                        </form>

                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }

}

export default withRouter(AddUser);