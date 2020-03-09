import * as Firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBDImn6-YKP4m_GNbvVCaRQKFhn4Mq-w8o",
  authDomain: "mvp-chat-58ef6.firebaseapp.com",
  databaseURL: "https://mvp-chat-58ef6.firebaseio.com",
  projectId: "mvp-chat-58ef6",
  storageBucket: "mvp-chat-58ef6.appspot.com",
  messagingSenderId: "271411937408",
  appId: "1:271411937408:web:ab8557ed64b544ec976665",
  measurementId: "G-SHEGL7J0G4"
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
