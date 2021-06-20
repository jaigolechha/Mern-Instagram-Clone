import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAIXTmSO8cJOFA0YPpoj4zN8iHh0AbDLW8",
  authDomain: "my-app7-a26cd.firebaseapp.com",
  projectId: "my-app7-a26cd",
  storageBucket: "my-app7-a26cd.appspot.com",
  messagingSenderId: "914970302620",
  appId: "1:914970302620:web:3edbdbdc1e7abd68f5f559",
  measurementId: "G-QZE9J5YCPL"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
