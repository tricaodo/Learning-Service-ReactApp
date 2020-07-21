import React from "react";
import { connect } from "react-redux";
import { fetchSentOffers } from "../../actions/offerAction";
import { newCollaboration, sendMessage } from "../../actions/helper";
import { collaborate } from "../../actions/collaborationAction";
import { withToastManager } from "react-toast-notifications";
class SentOffers extends React.Component {
  componentDidMount() {
    if (!this.props.auth.profile.id) {
      return
    }
    this.props.fetchSentOffers(this.props.auth.profile.id);
  }

  handleCollaboration = offer => {
    const { toastManager } = this.props;
    const collaboration = newCollaboration({ offer, fromUser: this.props.auth.profile });
    const message = sendMessage({ offer, fromUser: this.props.auth.profile });
    this.props.collaborate({ collaboration, message })
      .then(() => {
        toastManager.add("Collaboration was created successfully", {
          appearance: 'success',
          autoDismiss: true,
          autoDismissTimeout: 3000
        })
      });
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

  renderOfferItem = offer => {
    return (
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
        </div>

        <div className="card-footer">
          <p className="card-footer-item is-size-7 has-text-weight-medium ">{offer.toUser.fullName}</p>
          <p className="card-footer-item is-size-7 has-text-weight-medium "><i className="far fa-clock fa-lg"></i>: {offer.time} hours</p>
          <p className="card-footer-item is-size-7 has-text-weight-medium "><i className="fas fa-dollar-sign fa-lg"></i>: {offer.price}</p>
        </div>
        {
          offer.status === "accepted" && !offer.collaborateCreated &&
          <div className="has-text-centered">
            <hr style={{ margin: "0.5rem 0" }} />
            <button className="button is-success is-small mb-2" onClick={() => this.handleCollaboration(offer)}>Collaborate</button>
          </div>
        }
      </div>

      // <ServiceItem
      //   noButton
      //   className="offer-card"
      //   service={offer.service}>
      //   <div className="tag is-large">
      //     {offer.status}
      //   </div>
      //   <hr />
      //   <div className="service-offer">
      //     <div>
      //       <span className="label">To User:</span> {offer.toUser.fullName}
      //     </div>
      //     <div>
      //       <span className="label">Note:</span> {offer.note}
      //     </div>
      //     <div>
      //       <span className="label">Price:</span> ${offer.price}
      //     </div>
      //     <div>
      //       <span className="label">Time:</span> {offer.time} hours
      //           </div>
      //   </div>
      //   {
      //     offer.status === "accepted" && !offer.collaborateCreated &&
      //     <div>
      //       <hr />
      //       <button className="button is-success" onClick={() => this.handleCollaboration(offer)}>Collaborate</button>
      //     </div>
      //   }
      // </ServiceItem>
    )
  }

  renderSentOffers = () => {
    return this.props.sentOffers.map(offer => {
      return (
        <div key={offer.id} className="column is-one-quarter">
          {this.renderOfferItem(offer)}
        </div>
      )
    })
  }

  render() {
    return (
      <section className="section section-padding-top">
        <div className="container">
          <h1 className="title"><i className="fas fa-gift"></i> Sent Offers</h1>
          <div className="columns is-multiline">
            {this.renderSentOffers()}
          </div>
        </div>
      </section>
    )
  }
}
const mapStateToProps = state => {
  return { auth: state.auth, sentOffers: state.offer.sent }
}
export default connect(mapStateToProps, {
  fetchSentOffers,
  collaborate
})(withToastManager(SentOffers));