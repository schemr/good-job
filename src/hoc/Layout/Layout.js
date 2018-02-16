import React, {Component} from 'react';
import { connect } from 'react-redux';
import classes from './Layout.scss';
import Aux from '../Aux/Aux';
import Header from '../../components/Header/Header';

class Layout extends Component {
    render(){
        return (
            <Aux>
                <Header isAuth={this.props.isAuthenticated} />
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};


export default connect(mapStateToProps)(Layout);