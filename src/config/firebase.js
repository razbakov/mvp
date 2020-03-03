import * as Firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDVkgUO7NYflCEDhEu7OcNVBsluWWIrieY",
    authDomain: "mvp-app-1142f.firebaseapp.com",
    databaseURL: "https://mvp-app-1142f.firebaseio.com",
    projectId: "mvp-app-1142f",
    storageBucket: "mvp-app-1142f.appspot.com",
    messagingSenderId: "901639319329",
    appId: "1:901639319329:web:86b6e37378445bc0ced860",
    measurementId: "G-96G2Y80SMB"
};

function initFirebase () {
  Firebase.initializeApp(firebaseConfig)
  return new Promise((resolve, reject) => {
    Firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

export { Firebase, initFirebase }
