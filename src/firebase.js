import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAo1tsA9OllzLQOxAa2YUfR_aih028cyfI",
  authDomain: "crud-26257.firebaseapp.com",
  projectId: "crud-26257",
  storageBucket: "crud-26257.appspot.com",
  messagingSenderId: "177695461420",
  appId: "1:177695461420:web:d3bc477d2ba9a2d0524189"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)