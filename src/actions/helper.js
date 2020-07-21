import db, { Timestamp } from "../db";
export const createRef = (collection, docId) => db.doc(`${collection}/${docId}`);

// helper for offer
export const newCollaboration = ({ offer: { id, service, toUser, time }, fromUser }) => (
    {
        status: "pending",
        serviceId: service.id,
        title: service.title,
        image: service.image,
        time: time * 60 * 60,
        allowedPeople: [fromUser.id, toUser.id],
        joinedPeople: [],
        toUser: toUser.id,
        fromUser: fromUser.id,
        fromOffer: id,
        createdAt: Timestamp.fromDate(new Date()),
        expiredAt: ""
    }
)

export const sendMessage = ({ offer: { service, toUser }, fromUser }) => (
    {
        isRead: false,
        type: "invitation",
        text: `Hello ${toUser.fullName}! Please join the collaboration...`,
        cta: "",
        toUser: toUser.id,
        fromUser: {
            fullName: fromUser.fullName,
            avatar: fromUser.avatar
        },
        serviceTitle: service.title,
        serviceLink: `/services/${service.id}`,
        createdAt: Timestamp.fromDate(new Date())
    }
)