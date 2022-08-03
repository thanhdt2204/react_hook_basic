import { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
import userApi from '../../services/userService';
import { message, pagination } from '../../utils/constant';
import DeleteUser from './DeleteUser';
import ListUser from './ListUser';
import UpdateUser from './UpdateUser';
import './User.scss';

const User = (props) => {

    const [currentPage, setCurrentPage] = useState(0);
    const [email, setEmail] = useState('');
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [userPage, setUserPage] = useState({});

    const getAllUsers = async (currentPage) => {
        let response = await userApi.getAllUsers({ page: currentPage, size: pagination.PAGE_SIZE });
        if (response.status === 200) {
            setUserPage(response.data);
        }
    }

    useEffect(() => {
        getAllUsers(currentPage);
    }, [currentPage]);

    const handleAddNew = () => {
        props.history.push("/user/new");
    }

    const f_changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const f_buttonDelete = (email) => {
        setEmail(email);
    }

    const f_delete = async () => {
        await userApi.deleteUser(email).then((response) => {
            if (response.status === 500) {
                toast.error(message.INTERNAL_SERVER_ERROR);
            } else if (response.status === 400) {
                toast.warn(response.status + ': ' + response.message);
            } else {
                setCurrentPage(0);
                getAllUsers(currentPage);
                toast.success(message.DELETE_USER_SUCCESSFULLY);
            }
        });
    }

    const f_buttonUpdate = (email) => {
        setEmail(email);
        setIsOpenUpdateModal(true);
    }

    const f_update = async (user) => {
        await userApi.updateUser(user).then((response) => {
            if (response.status === 500) {
                toast.error(message.INTERNAL_SERVER_ERROR);
            } else if (response.status === 400) {
                toast.warn(response.status + ': ' + response.message);
            } else {
                setCurrentPage(0);
                setIsOpenUpdateModal(false);
                getAllUsers(currentPage);
                toast.success(message.UPDATE_USER_SUCCESSFULLY);
            }
        });
    }

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
                                <a href='# ' onClick={handleAddNew} className="btn btn-success">
                                    <i className="material-icons">&#xE147;</i>
                                    <span>Add New</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <ListUser userPage={userPage} currentPage={currentPage} f_changePage={f_changePage}
                        f_buttonDelete={f_buttonDelete} f_buttonUpdate={f_buttonUpdate} />
                </div>
            </div>
            {isOpenUpdateModal &&
                <UpdateUser email={email} f_update={f_update} />
            }
            <DeleteUser email={email} f_delete={f_delete} />
            <ToastContainer />
        </>
    );

}

export default withRouter(User);