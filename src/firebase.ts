import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCvrT0uBhqp6WiGa3xcx7Qok6jC6Pc2IhQ',
  authDomain: 'artcucu-d7128.firebaseapp.com',
  databaseURL: 'https://artcucu-d7128.firebaseio.com',
  projectId: 'artcucu-d7128',
  storageBucket: 'artcucu-d7128.appspot.com',
  messagingSenderId: '1089073214340',
  appId: '1:1089073214340:web:0e3e7bb89f05af6820a3d1',
  measurementId: 'G-C7T194SK21',
});

const auth = firebaseApp.auth();
auth.signInAnonymously();
const firestore = firebaseApp.firestore();

const likesCollection = firestore.collection('likes');
const picCollection = firestore.collection('pics');
export default firebaseApp;

export {
  auth,
  likesCollection,
  picCollection,
};
