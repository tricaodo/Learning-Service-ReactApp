import React from 'react';
import Home from "./pages/Home";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import ServiceDetail from "./pages/ServiceDetail";

import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import { connect } from "react-redux";
import { onAuthStateChanged } from "./actions/authAction";
import Spinner from './components/Spinner';
import ServiceCreate from './pages/services/ServiceCreate';
import UserServices from './pages/services/UserServices';
import SentOffers from './pages/offers/SentOffers';
import ReceivedOffers from './pages/offers/ReceivedOffers';

class App extends React.Component {
  componentDidMount() {
    this.props.onAuthStateChanged();
  }
  UNSAFE_componentWillUpdate() {
    const script = document.createElement("script");
    script.src = `${process.env.PUBLIC_URL}/js/fresh.js`;
    script.async = true
    document.body.appendChild(script);
  }
  render() {
    if (!this.props.auth.isResolved) return <Spinner />
    return (
      <div>
        <Router history={history}>
          <Navbar auth={this.props.auth} />
          <Navbar auth={this.props.auth} id="navbar-clone" />
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/faq" component={FAQ} />
            <Route path="/services/new" component={ServiceCreate} />
            <Route path="/offers/sent" component={SentOffers} />
            <Route path="/offers/received" component={ReceivedOffers} />
            <Route exact path="/services/:userId/:id" component={ServiceDetail} />
            <Route path="/services/:userId" component={UserServices} />
            <Route path="/services" component={Services} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}
export default connect(mapStateToProps, {
  onAuthStateChanged
})(App);
