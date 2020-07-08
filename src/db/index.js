import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDg0bMJkSqSHgT-W_A0rCRCWmsLfZRtM4s",
    authDomain: "chat-app-baea3.firebaseapp.com",
    databaseURL: "https://chat-app-baea3.firebaseio.com",
    projectId: "chat-app-baea3",
    storageBucket: "chat-app-baea3.appspot.com",
    messagingSenderId: "627805347500",
    appId: "1:627805347500:web:8c2b7adf444d63c94e8909",
    measurementId: "G-39LXLFP2S3"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig).firestore();
const { Timestamp } = firebase.firestore;
export { Timestamp };
