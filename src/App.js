import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import "./App.css";
import firebaseConfig from "./firebase.config";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase.initializeApp({});
} else {
  firebase.app(); // if already initialized
}

function App() {
  const [user, setUser] = useState({});
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };
  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        console.log("fb user", user);
        setUser(user);

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        setUser(user);
        console.log("gh user", user);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("error", errorCode, errorMessage, email, credential);
      });
  };

  
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      <br />
      <br />
      <button onClick={handleFacebookSignIn}>Sign In with Facebook</button>
      <br />
      <br />
      <button onClick={handleGithubSignIn}>Sign In with Github</button>
      <h3>User: {user.displayName}</h3>
      <p>image url: {user.photoUrl}</p>
      <img src={user.photoUrl} alt="" />
    </div>
  );
}

export default App;
