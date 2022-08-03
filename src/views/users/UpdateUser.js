import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import userApi from '../../services/userService';
import { message } from '../../utils/constant';

const UpdateUser = (props) => {

    const [inputs, setInputs] = useState({
        email: '',
        firstName: '',
        lastName: ''
    });

    useEffect(() => {
        async function fetchData() {
            let response = await userApi.getUser(props.email);
            if (response.status === 500) {
                toast.error(message.INTERNAL_SERVER_ERROR);
            } else if (response.status === 400) {
                toast.warn(response.status + ': ' + response.message);
            } else {
                const user = response.data;
                setInputs(state => ({
                    ...state,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }), []);
            }
        }
        fetchData();
    }, [props.email]);

    const handleChangeInput = (e) => {
        setInputs(state => ({ ...state, [e.target.name]: e.target.value }), []);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        props.f_update(inputs);
    };

    return (
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
                                <input value={inputs.email} type="email" name="email" className="form-control" disabled />
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input onChange={(e) => handleChangeInput(e)} name="firstName" value={inputs.firstName} type="text" className="form-control" required />
                            </div>

                            <div className="form-group">
                                <label>Last Name</label>
                                <input onChange={(e) => handleChangeInput(e)} name="lastName" value={inputs.lastName} type="text" className="form-control" required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                            <input onClick={(e) => handleUpdate(e)} type="submit" className="btn btn-info" data-dismiss="modal" value="Save" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;