import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomeView from './views/home.view';
import RegisterView from './views/register.view';
import LoginView from './views/login.view';
import DashboardView from './views/dashboard.view';
import GoodbyeView from './views/goodbye.view';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/Register" component={RegisterView} />
          <Route path="/Login" component={LoginView} />
          <Route path="/Dashboard" component={DashboardView} />
          <Route path="/Goodbye" component={GoodbyeView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
