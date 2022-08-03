import React from 'react';
import { withRouter } from "react-router";

class NotFound extends React.Component {

    handleToHome = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div style={{ color: "white", textAlign: "center", marginTop: "260px", fontWeight: "bold" }}>
                <div>Page not found</div>
                <a href='# ' onClick={this.handleToHome}>Back to home page</a>
            </div>
        );
    }

}

export default withRouter(NotFound);