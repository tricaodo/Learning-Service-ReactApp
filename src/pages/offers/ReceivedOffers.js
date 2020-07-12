import React from "react";
import { connect } from "react-redux";
import { fetchReceivedOffers, processOffer } from "../../actions/offerAction";
import ServiceItem from "../../components/service/ServiceItem"
class ReceivedOffers extends React.Component {
  componentDidMount() {
    this.props.fetchReceivedOffers(this.props.auth.profile.id)
  }

  renderStatus = status => {
    if (status === "pending") return "is-warning";
    if (status === "accepted") return "is-success";
    if (status === "declined") return "is-danger";
  }

  handleSuccess = offerId => {
    this.props.processOffer(offerId, "accepted");
  }

  handleDecline = offerId => {
    this.props.processOffer(offerId, "declined");
  }

  renderReceivedOffers = () => {
    return this.props.receivedOffers.map(offer => {
      return (
        <div key={offer.id} className="column is-one-third">
          <ServiceItem
            noButton
            className="offer-card"
            service={offer.service}>
            <div className={`tag is-large ${this.renderStatus(offer.status)}`}>
              {offer.status}
            </div>
            <hr />
            <div className="service-offer">
              <div>
                <span className="label">From User:</span> {offer.fromUser.fullName}
              </div>
              <div>
                <span className="label">Note:</span> {offer.note}
              </div>
              <div>
                <span className="label">Price:</span> ${offer.price}
              </div>
              <div>
                <span className="label">Time:</span> {offer.time} hours
              </div>

            </div>
            <hr />
            {
              offer.status === "pending" &&
              <div>
                <button className="button is-success b-m-r" onClick={() => this.handleSuccess(offer.id)}>Accept</button>
                <button className="button is-danger" onClick={() => this.handleDecline(offer.id)}>Decline</button>
              </div>
            }
          </ServiceItem>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container">
        <div className="content-wrapper">
          <h1 className="title">Received Offers</h1>
          <div className="columns">
            <div className="column is-one-third">
              {this.renderReceivedOffers()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { auth: state.auth, receivedOffers: state.offer.received };
}
export default connect(mapStateToProps, {
  fetchReceivedOffers,
  processOffer
})(ReceivedOffers);