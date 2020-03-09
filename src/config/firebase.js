import * as Firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBC17NMLzV-jGn9dMmhjNue603-wY90wp0",
  authDomain: "test-1afcf.firebaseapp.com",
  databaseURL: "https://test-1afcf.firebaseio.com",
  projectId: "test-1afcf",
  storageBucket: "test-1afcf.appspot.com",
  messagingSenderId: "86392753836",
  appId: "1:86392753836:web:e1843db43885738b535909"
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
