import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// firebaseApp
export const firebaseApp = firebase.initializeApp(firebaseConfig);

// firebase Auth
export const firebaseAuth = firebaseApp.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();

//firebase database
export const firebaseDatabase = firebaseApp.database();
