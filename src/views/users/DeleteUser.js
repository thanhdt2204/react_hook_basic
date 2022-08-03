import React from 'react';

class DeleteUser extends React.Component {

    handleDelete = async (e) => {
        e.preventDefault();
        this.props.f_delete();
    };

    render() {
        return (
            <>
                <div id="deleteUserModal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form>
                                <div className="modal-header">
                                    <h4 className="modal-title">Delete user [ {this.props.email} ]</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete?</p>
                                    <p className="text-warning"><small>This action cannot be undone.</small></p>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                                    <input data-dismiss="modal" onClick={(e) => this.handleDelete(e)} type="submit" className="btn btn-danger" value="Delete" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default DeleteUser;