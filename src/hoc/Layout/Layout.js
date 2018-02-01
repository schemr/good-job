import React, {Component} from 'react';
import classes from './Layout.scss'
import Aux from '../Aux/Aux';
import Header from '../../components/Header/Header';

class Layout extends Component {
    render(){
        return (
            <Aux>
                <Header />
                <main className={classes.Container}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;