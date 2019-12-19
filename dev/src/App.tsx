import React, { useState } from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Results from './containers/Results';
import Listing from './containers/Listing';
import Account from './containers/Account';
import RSVP from './containers/RSVP';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

const App: React.FC = () => {
  const [searchState, setSearchState] = useState('mi');
  const [searchCity, setSearchCity] = useState('Saginaw');
  const [selectedListing, setSelectedListing] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
