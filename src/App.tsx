import React from 'react';
import './App.scss';

// app specific
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// common
import NavbarComponent from './common/Navbar';
import FooterComponent from './common/Footer';

// containers
import BrowseComponent from './containers/Browse';
import AccountComponent from './containers/Account';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Switch>
          <Route exact path="/">
            <BrowseComponent />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/account">
            <AccountComponent />
          </Route>
        </Switch>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
