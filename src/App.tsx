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
import NotificationsComponent from './common/Notifications';

// containers
import BrowseComponent from './containers/Browse';
import AccountComponent from './containers/Account';
import BrandComponent from './containers/Brand';
import CreateComponent from './containers/Create';
import DinnerComponent from './containers/Dinner';
import ProfileComponent from './containers/Profile';
import ErrorComponent from './containers/Error';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state['loading']);

  // init firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    firebase.analytics();
  }

  // current user managment
  firebase.auth().onAuthStateChanged(auth => {
    if (auth) {
      firebase
        .database()
        .ref(`profiles/${auth.uid}`)
        .on('value', snapshot => {
          dispatch({
            type: 'SET_PROFILE',
            payload: snapshot.val()
          });
          if (snapshot.val().personal.zipcode) {
            dispatch({
            type: 'SET_ZIPCODE',
            payload: snapshot.val().personal.zipcode
          });
          }
        });
    } else {
      dispatch({
        type: 'SET_PROFILE',
        payload: null
      });
    }
    dispatch({
      type: 'SET_LOADING',
      payload: false
    });
    dispatch({
      type: 'SET_USER',
      payload: auth
    });
  });

  return (
    <div className="App">
      {loading ? (
        <LoadingComponent />
      ) : (
        <Router>
          <NavbarComponent />
          <NotificationsComponent />
          <Switch>
            <Route exact path="/">
              <BrowseComponent />
            </Route>
            <Route exact path="/account">
              <AccountComponent />
            </Route>
            <Route exact path="/brand">
              <BrandComponent />
            </Route>
            <Route exact path="/create">
              <CreateComponent />
            </Route>
            <Route exact path="/dinner">
              <DinnerComponent />
            </Route>
            <Route exact path="/profile">
              <ProfileComponent />
            </Route>
            <Route component={ErrorComponent} />
          </Switch>
          <FooterComponent />
        </Router>
      )}
    </div>
  );
};

export default App;
