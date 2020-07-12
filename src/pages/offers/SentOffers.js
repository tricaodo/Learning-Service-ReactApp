import React from "react";
import { connect } from "react-redux";
import { fetchSentOffers } from "../../actions/offerAction";
import ServiceItem from "../../components/service/ServiceItem"
import { newCollaboration } from "../../actions/helper";
class SentOffers extends React.Component {
  componentDidMount() {
    this.props.fetchSentOffers(this.props.auth.profile.id);
  }

  handleCollaboration = offer => {
    const collaboration = newCollaboration({ offer, fromUser: this.props.auth.profile })
    console.log(collaboration);
  }

  renderSentOffers = () => {
    return this.props.sentOffers.map(offer => {
      return (
        <div key={offer.id} className="column is-one-third">
          <ServiceItem
            noButton
            className="offer-card"
            service={offer.service}>
            <div className="tag is-large">
              {offer.status}
            </div>
            <hr />
            <div className="service-offer">
              <div>
                <span className="label">To User:</span> {offer.toUser.fullName}
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
            {
              offer.status === "accepted" &&
              <div>
                <hr />
                <button className="button is-success" onClick={() => this.handleCollaboration(offer)}>Collaborate</button>
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
          <h1 className="title">Sent Offers</h1>
          <div className="columns">
            {this.renderSentOffers()}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return { auth: state.auth, sentOffers: state.offer.sent }
}
export default connect(mapStateToProps, {
  fetchSentOffers
})(SentOffers);