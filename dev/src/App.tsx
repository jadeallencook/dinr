import React from 'react';
import Navbar from './presentational/Navbar';
import Footer from './presentational/Footer';
import Results from './containers/Results';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Results />
      <Footer />
    </div>
  );
}

export default App;
