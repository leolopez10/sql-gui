import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Import pages
import LandingPage from './views/LandingPage';

// Import Style
import './assets/css/style.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' render={props => <LandingPage {...props} />} />
    </BrowserRouter>
  );
}

export default App;
