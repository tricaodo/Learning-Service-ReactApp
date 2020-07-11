import db from "../db";

export const createOffer = offer => {
    return db
        .collection("offers")
        .add(offer)
}