import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Introduce from './components/Introduce/Introduce';
import SentenceList from './containers/Sentences/SentenceList/SentenceList';
import AddSentence from './containers/Sentences/AddSentence/AddSentence';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Notification from './components/Notification/Notification';
import { authCheckState, authSetUser } from './store/actions/index';
import { firebase } from './firebase';

class App extends Component {
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      console.log(authUser)
      authUser ? this.props.onAuthSetUser(authUser) : this.props.onAuthSetUser()
    });
    //this.props.onTryAutoSignup();
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Introduce} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/sentences" component={SentenceList} />
          <Route path="/new" component={AddSentence} />
          <Route path="/notification" component={Notification} />
          <Route path="/logout" component={Logout} />  
          <Redirect to="/sentences" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthSetUser: (user) => dispatch(authSetUser(user)),
    onTryAutoSignup: () => dispatch( authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );