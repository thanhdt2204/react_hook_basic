import _ from 'lodash';

const ListUser = (props) => {

    const { numberOfElements, totalElements, totalPages } = props.userPage;
    const userList = !_.isEmpty(props.userPage) ? props.userPage.content : [];
    const currentPage = props.currentPage;

    const handleChangePage = (pageNumber) => {
        props.f_changePage(pageNumber);
    };

    const handleButtonDelete = (email) => {
        props.f_buttonDelete(email);
    };

    const handleButtonUpdate = (email) => {
        props.f_buttonUpdate(email);
    };

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
                        userList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>
                                        <a href="#editUserModal" onClick={() => handleButtonUpdate(item.email)} className="edit" data-toggle="modal">
                                            <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                                        </a>
                                        <a href='#deleteUserModal' onClick={() => handleButtonDelete(item.email)} className="delete" data-toggle="modal">
                                            <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                        </a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {userList.length > 0 &&
                <div className="clearfix">
                    <div className="hint-text">
                        Showing&nbsp;
                        <b>{numberOfElements}</b>&nbsp;
                        out of&nbsp;
                        <b>{totalElements}</b>&nbsp;
                        entries
                    </div>
                    <ul className="pagination">
                        {currentPage === 0 &&
                            <li className="page-item disabled">
                                <a href='# '>Previous</a>
                            </li>
                        }
                        {currentPage > 0 &&
                            <li onClick={() => handleChangePage(currentPage - 1)} className="page-item">
                                <a href='# '>Previous</a>
                            </li>
                        }

                        {
                            _.range(0, totalPages, 1).map((item, index) => {
                                const activeClass = currentPage === item ? 'active' : '';
                                return (
                                    <li onClick={() => handleChangePage(item)} key={index} className={`page-item ${activeClass}`}>
                                        <a href='# ' className="page-link">{item + 1}</a>
                                    </li>
                                );
                            })
                        }
                        {currentPage === totalPages - 1 &&
                            <li className="page-item disabled">
                                <a href='# ' className="page-link">Next</a>
                            </li>
                        }
                        {currentPage < totalPages - 1 &&
                            <li onClick={() => handleChangePage(currentPage + 1)} className="page-item">
                                <a href='# ' className="page-link">Next</a>
                            </li>
                        }
                    </ul>
                </div>
            }
        </>
    );

}

export default ListUser;