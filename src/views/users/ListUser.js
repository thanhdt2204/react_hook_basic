import React from 'react';
import _ from 'lodash';

class ListUser extends React.Component {

    handleChangePage = (pageNumber) => {
        this.props.f_changePage(pageNumber);
    };

    handleButtonDelete = (email) => {
        this.props.f_buttonDelete(email);
    };

    handleButtonUpdate = (email) => {
        this.props.f_buttonUpdate(email);
    };

    render() {
        return (
            <>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.userList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>
                                            <a href="#editUserModal" onClick={() => this.handleButtonUpdate(item.email)} className="edit" data-toggle="modal">
                                                <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                            </a>
                                            <a href='#deleteUserModal' onClick={() => this.handleButtonDelete(item.email)} className="delete" data-toggle="modal">
                                                <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {this.props.userList.length > 0 &&
                    <div className="clearfix">
                        <div className="hint-text">
                            Showing&nbsp;
                            <b>{this.props.numberOfElements}</b>&nbsp;
                            out of&nbsp;
                            <b>{this.props.totalElements}</b>&nbsp;
                            entries
                        </div>
                        <ul className="pagination">
                            {this.props.currentPage === 0 &&
                                <li className="page-item disabled">
                                    <a href='# '>Previous</a>
                                </li>
                            }
                            {this.props.currentPage > 0 &&
                                <li onClick={() => this.handleChangePage(this.props.currentPage - 1)} className="page-item">
                                    <a href='# '>Previous</a>
                                </li>
                            }

                            {
                                _.range(0, this.props.totalPages, 1).map((item, index) => {
                                    const activeClass = this.props.currentPage === item ? 'active' : '';
                                    return (
                                        <li onClick={() => this.handleChangePage(item)} key={index} className={`page-item ${activeClass}`}>
                                            <a href='# ' className="page-link">{item + 1}</a>
                                        </li>
                                    );
                                })
                            }
                            {this.props.currentPage === this.props.totalPages - 1 &&
                                <li className="page-item disabled">
                                    <a href='# ' className="page-link">Next</a>
                                </li>
                            }
                            {this.props.currentPage < this.props.totalPages - 1 &&
                                <li onClick={() => this.handleChangePage(this.props.currentPage + 1)} className="page-item">
                                    <a href='# ' className="page-link">Next</a>
                                </li>
                            }
                        </ul>
                    </div>
                }
            </>
        );
    }
}

export default ListUser;