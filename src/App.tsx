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

// common
import NavbarComponent from './common/Navbar';
import FooterComponent from './common/Footer';
import LoadingComponent from './common/Loading';

// containers
import BrowseComponent from './containers/Browse';
import AccountComponent from './containers/Account';
import ErrorComponent from './containers/Error';

const App: React.FC = () => {
  
  const loading = useSelector(state => state['loading']);

  // init firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    firebase.analytics();
  }

  // current user managment
  firebase.auth().onAuthStateChanged(auth => {
  });

  return (
    <div className="App">
      <Router>
        {loading ? <LoadingComponent /> : null}
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
