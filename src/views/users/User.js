import React from 'react';
import './User.scss';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import ListUser from './ListUser';
import userApi from '../../services/userService';
import { withRouter } from "react-router";
import { pagination } from '../../utils/constant';
import { ToastContainer, toast } from 'react-toastify';
import { message } from '../../utils/constant';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            userList: [],
            user: {},
            numberOfElements: 0,
            totalElements: 0,
            totalPages: 0,
            email: '',
            isOpenUpdateModal: false
        }
    }

    getAllUsers = async (currentPage) => {
        let response = await userApi.getAllUsers({ page: currentPage, size: pagination.PAGE_SIZE });
        if (response.status === 200) {
            this.setState({
                userList: response.data.content,
                numberOfElements: response.data.numberOfElements,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages
            })
        }
    }

    componentDidMount() {
        this.getAllUsers(this.state.currentPage);
    }

    handleAddNew = () => {
        this.props.history.push("/user/new");
    }

    f_changePage = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        })
        this.getAllUsers(pageNumber);
    }

    f_buttonDelete = (email) => {
        this.setState({
            email: email,
        })
    }

    f_delete = async () => {
        await userApi.deleteUser(this.state.email).then((response) => {
            if (response.status === 500) {
                toast.error(message.INTERNAL_SERVER_ERROR);
            } else if (response.status === 400) {
                toast.warn(response.status + ': ' + response.message);
            } else {
                this.setState({
                    currentPage: 0
                })
                this.getAllUsers(this.state.currentPage);
                toast.success(message.DELETE_USER_SUCCESSFULLY);
            }
        });
    }

    f_buttonUpdate = (email) => {
        this.setState({
            email: email,
            isOpenUpdateModal: true
        })
    }

    f_update = async (user) => {
        await userApi.updateUser(user).then((response) => {
            if (response.status === 500) {
                toast.error(message.INTERNAL_SERVER_ERROR);
            } else if (response.status === 400) {
                toast.warn(response.status + ': ' + response.message);
            } else {
                this.setState({
                    isOpenUpdateModal: false,
                    currentPage: 0
                })
                this.getAllUsers(this.state.currentPage);
                toast.success(message.UPDATE_USER_SUCCESSFULLY);
            }
        });
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>User Management</h2>
                                </div>
                                <div className="col-sm-6">
                                    <a href='# ' onClick={this.handleAddNew} className="btn btn-success">
                                        <i className="material-icons">&#xE147;</i>
                                        <span>Add New</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <ListUser userList={this.state.userList} numberOfElements={this.state.numberOfElements}
                            totalElements={this.state.totalElements} totalPages={this.state.totalPages}
                            currentPage={this.state.currentPage} f_changePage={this.f_changePage}
                            f_buttonDelete={this.f_buttonDelete} f_buttonUpdate={this.f_buttonUpdate} />
                    </div>
                </div>
                {this.state.isOpenUpdateModal &&
                    <UpdateUser email={this.state.email} f_update={this.f_update} />
                }
                <DeleteUser email={this.state.email} f_delete={this.f_delete} />
                <ToastContainer />
            </>
        );
    }

}

export default withRouter(User);