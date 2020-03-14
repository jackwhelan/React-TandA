import React from 'react';
import Navbar from './components/AppNavbar.component';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomeView from './views/home.view';
import RegisterView from './views/register.view';
import LoginView from './views/login.view';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/register" component={RegisterView} />
          <Route path="/login" component={LoginView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
