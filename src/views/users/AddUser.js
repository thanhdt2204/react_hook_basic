import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import userApi from '../../services/userService';
import { message } from '../../utils/constant';

const AddUser = () => {

    const history = useHistory();

    const [inputs, setInputs] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });

    const handleChangeInput = (e) => {
        setInputs(state => ({ ...state, [e.target.name]: e.target.value }), [])
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        await userApi.saveUser(inputs).then((response) => {
            if (response.status === 500) {
                toast.error(message.INTERNAL_SERVER_ERROR);
            } else if (response.status === 400) {
                toast.warn(response.status + ': ' + response.message);
            } else {
                history.push("/user");
            }
        });
    };

    return (
        <>
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">Create User</div>
                    <form >
                        <div className="form-group">
                            <label>Email</label>
                            <input onChange={(e) => handleChangeInput(e)} value={inputs.email} name="email"
                                type="email" className="form-control" required />
                        </div>

                        <div className="form-group">
                            <label>First Name</label>
                            <input onChange={(e) => handleChangeInput(e)} value={inputs.firstName} name="firstName"
                                type="text" className="form-control" required />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input onChange={(e) => handleChangeInput(e)} value={inputs.lastName} name="lastName"
                                type="text" className="form-control" required />
                        </div>

                        <Link to="/user" className='btn btn-default'>Cancel</Link>&nbsp;
                        <input onClick={(e) => handleAdd(e)} className='btn btn-success' type="submit" value="Submit" />
                    </form>

                </div>
            </div>
            <ToastContainer />
        </>
    );

}

export default AddUser;