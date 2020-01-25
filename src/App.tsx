import React, { useState } from 'react';

// components
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Results from './containers/Results';
import Listing from './containers/Listing';
import Account from './containers/Account';
import Create from './containers/Create';
import RSVP from './containers/RSVP';

// app specific
import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/database';
import firebaseConfig from './assets/firebase-config.json';
import { Profile } from './interfaces';
import zipcodeToStateAndCity from './assets/reverse-zipcode.json';

const App: React.FC = props => {
  const [searchState, setSearchState] = useState('mi');
  const [searchCity, setSearchCity] = useState('Saginaw');
  const [selectedListing, setSelectedListing] = useState(null);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  // init firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  // current user managment
  firebase.auth().onAuthStateChanged(user => {
    setCurrentUser(user);
    if (user && !currentProfile && currentUser) {
      firebase
        .database()
        .ref(`profiles/${user.uid}`)
        .once('value')
        .then(snapshot => {
          const profile: Profile = snapshot.val();
          let code = null;
          if (profile.personal?.zipcode) {
            const { zipcode } = profile.personal;
            code = zipcodeToStateAndCity[zipcode];
          }
          if (code) {
            const [city, state] = code.split(':');
            setSearchCity(city);
            setSearchState(state);
          }
          setCurrentProfile(profile);
        });
    } else if (!currentUser) {
      setCurrentProfile(null);
    }
  });

  return (
    <div className="App">
      <Router>
        <Navbar
          setSearchState={setSearchState}
          searchState={searchState}
          setSearchCity={setSearchCity}
          searchCity={searchCity}
        />
        <Switch>
          <Route exact path="/">
            <Results
              searchState={searchState}
              searchCity={searchCity}
              selectedListing={selectedListing}
              setSelectedListing={setSelectedListing}
            />
          </Route>
        </Switch>
        <Switch>
          <Route path="/listing/:uri">
            <Listing
              selectedListing={selectedListing}
              setSelectedListing={setSelectedListing}
            />
          </Route>
        </Switch>
        <Switch>
          <Route path="/account">
            <Account
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              currentProfile={currentProfile}
              setCurrentProfile={setCurrentProfile}
              setSearchState={setSearchState}
              setSearchCity={setSearchCity}
            />
          </Route>
        </Switch>
        <Switch>
          <Route path="/rsvp/:uri">
            <RSVP
              selectedListing={selectedListing}
              setSelectedListing={setSelectedListing}
            />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/create">
            <Create />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
