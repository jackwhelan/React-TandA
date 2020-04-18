import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import HomeView from './views/pages/home.view';
import RegisterView from './views/pages/register.view';
import LoginView from './views/pages/login.view';
import DashboardView from './views/pages/dashboard.view';
import ClockingView from './views/pages/clocking.view';
import AccountView from './views/pages/account.view';
import ScheduleView from './views/pages/schedule.view';
import NewsView from './views/pages/news.view';
import QRView from './views/pages/qr.view';
import PayPortalView from './views/pages/payportal.view';
import GoodbyeView from './views/info/goodbye.view';
import NotFoundView from './views/info/404.view';

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
          <Route path="/News" component={NewsView} />
          <Route path="/QRCode" component={QRView} />
          <Route path="/PayPortal" component={PayPortalView} />
          <Route component={NotFoundView} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
