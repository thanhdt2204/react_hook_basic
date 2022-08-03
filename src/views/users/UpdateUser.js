import React from 'react';
import _ from 'lodash';
import userApi from '../../services/userService';
import { toast } from 'react-toastify';
import { message } from '../../utils/constant';

class UpdateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
        }
    }

    getUser = async (email) => {
        let user = null;
        let response = await userApi.getUser(email);
        if (response.status === 500) {
            toast.error(message.INTERNAL_SERVER_ERROR);
        } else if (response.status === 400) {
            toast.warn(response.status + ': ' + response.message);
        } else {
            user = response.data;
        }
        return user;
    }

    async componentDidMount() {
        let user = await this.getUser(this.props.email);
        if (user && !_.isEmpty(user)) {
            this.setState({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            })
        }
    }

    async componentDidUpdate(nextProps) {
        if (this.props.email !== nextProps.email) {
            let user = await this.getUser(this.props.email);
            if (user && !_.isEmpty(user)) {
                this.setState({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                })
            }
        }
    }

    handleChangeInput = (e, key) => {
        let copyState = { ...this.state };
        copyState[key] = e.target.value;
        this.setState({
            ...copyState
        });
    };

    handleUpdate = async (e) => {
        e.preventDefault();
        this.props.f_update({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        });
    };

    render() {
        return (
            <>
                <div id="editUserModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">Update User</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={this.state.email} type="email" className="form-control" disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input onChange={(e) => this.handleChangeInput(e, 'firstName')} value={this.state.firstName} type="text" className="form-control" required />
                                    </div>

                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input onChange={(e) => this.handleChangeInput(e, 'lastName')} value={this.state.lastName} type="text" className="form-control" required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                                    <input onClick={(e) => this.handleUpdate(e)} type="submit" className="btn btn-info" data-dismiss="modal" value="Save" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default UpdateUser;