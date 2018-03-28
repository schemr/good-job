import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../../firebase';

import { logout } from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
        auth.doSignOut();
    };

    render() {
        return <Redirect to="/" />;
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);