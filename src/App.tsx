import React from 'react';
import './App.scss';

// app specific
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/analytics';
import 'firebase/auth';
import config from './assets/firebase-config.json';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './actions';

// common
import NavbarComponent from './common/Navbar';
import FooterComponent from './common/Footer';
import Loading from './common/Loading';

// containers
import BrowseComponent from './containers/Browse';
import AccountComponent from './containers/Account';
import ErrorComponent from './containers/Error';

const App: React.FC = () => {

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  // init firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    firebase.analytics();
  }

  // current user managment
  firebase.auth().onAuthStateChanged(auth => {
    dispatch(login(auth));
  });

  return (
    <div className="App">
      <Router>
        {!user ? <Loading /> : null}
        <NavbarComponent />
        <Switch>
          <Route exact path="/">
            <BrowseComponent />
          </Route>
          <Route exact path="/account">
            <AccountComponent />
          </Route>
          <Route component={ErrorComponent} />
        </Switch>
        <FooterComponent />
      </Router>
    </div>
  );
};

export default App;
