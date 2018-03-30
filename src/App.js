import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Introduce from './components/Introduce/Introduce';
import Logout from './containers/Auth/Logout/Logout';

import { authSetUser } from './store/actions/index';
import { firebase } from './firebase';

const asyncSentenceList = asyncComponent(() => {
  return import('./containers/Sentences/SentenceList/SentenceList.js' /* webpackChunkName: "sentences" */)
});

const asyncAddSentece = asyncComponent(() => {
  return import('./containers/Sentences/AddSentence/AddSentence.js' /* webpackChunkName: "addsentence" */)
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth.js' /* webpackChunkName: "auth" */)
});

const asyncNotification = asyncComponent(() => {
  return import('./components/Notification/Notification.js' /* webpackChunkName: "notification" */)
});

class App extends Component {
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser ? this.props.onAuthSetUser(authUser) : this.props.onAuthSetUser(null)
    });
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={Introduce} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.user) {
      routes = (
        <Switch>
          <Route path="/sentences" component={asyncSentenceList} />
          <Route path="/new" component={asyncAddSentece} />
          <Route path="/notification" component={asyncNotification} />
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
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthSetUser: (user) => dispatch(authSetUser(user))
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );