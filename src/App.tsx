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
import futureDateStrings from './services/future-date-strings';

const App: React.FC = props => {
  const [searchState, setSearchState] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [previousSearch, setPreviousSearch] = useState('');
  const [previousListing, setPreviousListing] = useState<any>(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loadSearchFromHash, setLoadSearchFromHash] = useState<string | boolean>(false);
  const search = `${searchCity.replace(' ', '')}_${searchState}`;


  // init firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  if (window.location.hash.indexOf('#/rsvp/') === 0 && !selectedListing && !loadSearchFromHash) {
    setLoadSearchFromHash(true);
    firebase
      .database()
      .ref(`dinners/${window.location.hash.replace('#/rsvp/', '')}`)
      .once('value')
      .then(snapshot => {
        setSelectedListing(snapshot.val());
        setPreviousListing(snapshot.val());
        setLoadSearchFromHash(snapshot.val());
        console.log(`GET: dinners/${selectedListing}`);
      });
  }

  // select listing
  if (typeof selectedListing !== 'object' && selectedListing !== previousListing) {
    firebase
      .database()
      .ref(`dinners/${selectedListing}`)
      .once('value')
      .then(snapshot => {
        setSelectedListing(snapshot.val());
        setPreviousListing(snapshot.val());
        console.log(`GET: dinners/${selectedListing}`);
      });
  }

  // search results
  if (searchCity && searchState && search !== previousSearch) {
    let promises: Array<Promise<any>> = [];
    setSearchResults([]);
    const dates = futureDateStrings();
    setPreviousSearch(search);
    dates.forEach(date => {
      const endpoint = `${search}_${date}`.toLocaleLowerCase();
      promises.push(new Promise(res => {
        firebase
          .database()
          .ref(`dinners/${endpoint}`)
          .once('value')
          .then(snapshot => {
            console.log(`GET: dinners/${endpoint}`);
            res({
              snapshot: snapshot.val(),
              endpoint
            });
          });
      }))
    });
    Promise.all(promises).then(response => {
      let listings: any = [];
      response
        .filter(listing => listing.snapshot)
        .forEach(listing => {
          Object.keys(listing.snapshot).forEach((key: string) => {
            listings.push({
              ...listing.snapshot[key],
              uri: `${listing.endpoint}/${key}`
            });
          });
        });
      setSearchResults(listings);
    })
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
          console.log(`GET: profiles/${user.uid}`);
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
              currentUser={currentUser}
              currentProfile={currentProfile}
              searchState={searchState}
              searchCity={searchCity}
              selectedListing={selectedListing}
              setSelectedListing={setSelectedListing}
              searchResults={searchResults}
            />
          </Route>
        </Switch>
        <Switch>
          <Route path="/listing/:uri">
            <Listing
              currentUser={currentUser}
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
          <Route exact path="/create" render={() => {
            return (
              currentUser &&
              currentProfile?.personal?.street &&
              currentProfile?.personal?.zipcode
            ) ? <Create /> : <Account
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentProfile={currentProfile}
                setCurrentProfile={setCurrentProfile}
                setSearchState={setSearchState}
                setSearchCity={setSearchCity}
              />
          }}>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
