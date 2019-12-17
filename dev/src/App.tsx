import React, { useState } from 'react';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Results from './containers/Results';
import './App.scss';

const App: React.FC = () => {
  const [searchState, setSearchState] = useState('mi');
  const [searchCity, setSearchCity] = useState('Saginaw');
  const [selectedListing, setSelectedListing] = useState(null);

  return (
    <div className="App">
      <Navbar
        setSearchState={setSearchState}
        searchState={searchState}
        setSearchCity={setSearchCity}
        searchCity={searchCity}
      />
      <Results
        searchState={searchState}
        searchCity={searchCity}
        selectedListing={selectedListing}
        setSelectedListing={setSelectedListing}
      />
      {selectedListing}
      <Footer />
    </div>
  );
}

export default App;
