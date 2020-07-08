import React from 'react';
import Home from "./pages/Home";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceDetail from "./pages/ServiceDetail";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Navbar id="navbar-clone" />
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/faq" component={FAQ} />
          <Route path="/services/:id" component={ServiceDetail} />
          <Route path="/services" component={Services} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
