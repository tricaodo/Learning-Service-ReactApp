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
        <section className="section hero has-background-light ">
          <div className="container">
            <h1 className="is-size-3 pt-0 has-text-centered has-text-grey-dark">Our Future in Your Hands</h1>
            <h2 className="is-size-5 has-text-centered has-text-grey">
              Acquiring Your <strong>Knowledge</strong> Today.
            </h2>
          </div>
        </section>


        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {this.renderServices()}
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