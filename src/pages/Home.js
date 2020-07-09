/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react'
import { fetchServices } from "../actions/serviceAction";
import ServiceItem from '../components/service/ServiceItem';
import Hero from '../components/Hero';
import { connect } from "react-redux";


class Home extends React.Component {

  componentDidMount() {
    this.props.fetchServices();
  }

  renderServices = () => {
    return this.props.services.map(service =>
      <ServiceItem service={service} key={service.id} />
    )
  }

  render() {
    return (
      <div>
        <Hero />
        <section className="section section-feature-grey is-medium">
          <div className="container">
            <div className="title-wrapper has-text-centered">
              <h2 className="title is-2">Great Power Comes </h2>
              <h3 className="subtitle is-5 is-muted">With great Responsability</h3>
              <div className="divider is-centered"></div>
            </div>

            <div className="content-wrapper">
              <div className="columns">
                {this.renderServices()}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { services: Object.values(state.services) };
}
export default connect(mapStateToProps, {
  fetchServices
})(Home);