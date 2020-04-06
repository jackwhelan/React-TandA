import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomeView from './views/home.view';
import RegisterView from './views/register.view';
import LoginView from './views/login.view';
import DashboardView from './views/dashboard.view';
import GoodbyeView from './views/goodbye.view';
import NotFoundView from './views/404.view';
import ClockingView from './views/clocking.view';
import AccountView from './views/account.view';
import ScheduleView from './views/schedule.view';

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
          <Route path="/Clocking" component={ClockingView} />
          <Route path="/Account" component={AccountView} />
          <Route path="/Schedule" component={ScheduleView} />
          <Route component={NotFoundView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
