import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
 // API Keys
  };

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else{
  app =firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
