import React from "react";
import { connect } from "react-redux";
import { fetchReceivedOffers, processOffer, resetReceivedOffersState } from "../../actions/offerAction";
import Spinner from "../../components/Spinner";
import requiredAuth from "../../components/hoc/requiredAuth"
class ReceivedOffers extends React.Component {
  componentDidMount() {
    if (!this.props.auth.profile.id) {
      return
    }
    this.props.fetchReceivedOffers(this.props.auth.profile.id)
  }

  componentWillUnmount() {
    this.props.resetReceivedOffersState();
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


  renderOfferStatus = ({ status }) => {
    if (status === "accepted") {
      return <span className="tag mb-3 has-text-success has-text-weight-bold">{status}</span>
    } else if (status === "pending") {
      return <span className="tag mb-3 has-text-weight-bold">{status}...</span>
    } else {
      return <span className="tag mb-3 has-text-danger has-text-weight-bold">{status}</span>
    }
  }

  renderReceivedOffers = () => {
    return this.props.receivedOffers.map(offer => {
      return (
        <div key={offer.id} className="column is-one-quarter">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img src={offer.service.image} alt={offer.service.title} />
              </figure>
            </div>
            <div className="content is-size-5 has-text-weight-medium has-text-centered card-title">
              {offer.service.title}
            </div>
            <div className="content has-text-centered mb-0 mt-2">
              {this.renderOfferStatus(offer)}
            </div>

            <div className="card-content pt-0 card-content-border">
              <div className="content is-size-7 has-text-weight-medium">
                <strong>Note: </strong>{offer.note}
              </div>
              {offer.status === "pending" &&
                <React.Fragment>
                  <hr style={{ height: "1px", margin: "0.5rem" }} />
                  <div className="content has-text-centered">
                    <button className="button is-small is-primary is-light mr-2" onClick={() => this.handleSuccess(offer.id)}>Accept</button>
                    <button className="button is-small is-danger is-light" onClick={() => this.handleDecline(offer.id)}>Decline</button>
                  </div>
                </React.Fragment>
              }
            </div>

            <div className="card-footer">
              <p className="card-footer-item is-size-7 has-text-weight-medium ">{offer.fromUser.fullName}</p>
              <p className="card-footer-item is-size-7 has-text-weight-medium "><i className="far fa-clock fa-lg"></i>: {offer.time} hours</p>
              <p className="card-footer-item is-size-7 has-text-weight-medium "><i className="fas fa-dollar-sign fa-lg"></i>: {offer.price}</p>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    if (this.props.isFetching) {
      return <Spinner />
    }
    return (
      <section className="section section-padding-top">
        <div className="container">
          <h1 className="title"><i className="fas fa-gift"></i> Received Offers</h1>
          <div className="columns is-multiline">
            {this.renderReceivedOffers()}

          </div>
        </div>
      </section>
    )
  }
}
const mapStateToProps = state => {
  return { auth: state.auth, receivedOffers: state.offer.received, isFetching: state.isFetching };
}
export default connect(mapStateToProps, {
  fetchReceivedOffers,
  processOffer,
  resetReceivedOffersState
})(requiredAuth(ReceivedOffers));