import React, { Component } from 'react';
import classes from './Header.scss';

class Header extends Component {
    state = {
        isAuth: false
    }
    render() {
        return(
            <header className={classes.Header}>
                {this.state.isAuth ? "List" : null}
                <div className={classes.Title}>Good Job!</div>
                {this.state.isAuth ? <nav className={classes.Nav}>
                    <ul>
                        <li>Logout</li>
                    </ul>
                </nav> : null}
            </header>
        )
    }
    
}

export default Header;