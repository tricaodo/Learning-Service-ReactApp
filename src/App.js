import React from 'react';
import Home from "./pages/Home";
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
import { onAuthStateChanged, fetchMessages } from "./actions/authAction";
import Spinner from './components/Spinner';
import ServiceCreate from './pages/services/ServiceCreate';
import ServiceEdit from './pages/services/ServiceEdit';
import UserServices from './pages/services/UserServices';
import SentOffers from './pages/offers/SentOffers';
import ReceivedOffers from './pages/offers/ReceivedOffers';
import ReceivedCollaborations from './pages/ReceivedCollaborations';
import Collaboration from './pages/Collaboration';
import { checkUserConnection } from "./actions/connection";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneLoading: false,
      currentInstance: this
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { auth, fetchMessages } = props;
    const { doneLoading, currentInstance } = state;

    if (Object.keys(auth.profile).length > 0 && !doneLoading) {
      currentInstance.unSubcribeToFetchMessages = fetchMessages(auth.profile.id);
      checkUserConnection(auth.profile.id);
      return { doneLoading: true }
    }

    if (!auth.profile.id) {
      currentInstance.unSubcribeToFetchMessages && currentInstance.unSubcribeToFetchMessages();
    }

    return null;
  }

  componentDidMount() {
    this.unSubcribeToAuth = this.props.onAuthStateChanged();
  }

  componentWillUnmount() {
    this.state.currentInstance.unSubcribeToFetchMessages();
    this.unSubcribeToAuth();
  }

  render() {
    if (!this.props.auth.isResolved) return <Spinner />
    return (
      <div>
        <Router history={history}>
          <Navbar auth={this.props.auth} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/faq" component={FAQ} />
            <Route exact path="/collaborations/me" component={ReceivedCollaborations} />
            <Route path="/collaborations/:id" component={Collaboration} />
            <Route path="/services/new" component={ServiceCreate} />
            <Route path="/offers/sent" component={SentOffers} />
            <Route path="/offers/received" component={ReceivedOffers} />
            <Route exact path="/services/:id/edit" component={ServiceEdit} />
            <Route exact path="/services/:userId/:id" component={UserServices} />
            <Route path="/services/:id" component={ServiceDetail} />
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
  onAuthStateChanged,
  fetchMessages
})(App);
