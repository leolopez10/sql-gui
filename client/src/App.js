import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Import pages
import LandingPage from './views/LandingPage';
import SignUpPage from './views/SignUpPage';
import LoginPage from './views/LoginPage';

// Import Style
import './assets/css/style.css';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' render={props => <LandingPage {...props} />} />
      <Route exact path='/signup' render={props => <SignUpPage {...props} />} />
      <Route exact path='/login' render={props => <LoginPage {...props} />} />
    </BrowserRouter>
  );
}

export default App;
