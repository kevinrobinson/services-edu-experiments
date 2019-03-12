import React from 'react';
import Routing from './Routing';
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import './App.css';


function App({user, signOut, signInWithGoogle}) {
  return (
    <div className="app">
      <Routing user={user} signOut={signOut} signInWithGoogle={signInWithGoogle} />
    </div>
  );
}

// function wrappedWithFirebaseConfig(component) {
//   const firebaseApp = firebase.initializeApp(firebaseConfig);
//   const firebaseAppAuth = firebaseApp.auth();
//   const providers = {
//     googleProvider: new firebase.auth.GoogleAuthProvider(),
//   };
//   return withFirebaseAuth({providers,firebaseAppAuth});
// }

// export default wrappedWithFirebaseConfig(App);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
export default withFirebaseAuth({providers,firebaseAppAuth})(App);