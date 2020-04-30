import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

// Agregar configuración firebase:
var firebaseConfig = {
  apiKey: 'AIzaSyBO9M4dmfW29vvnYD6DufYCPmXtTXtjDbw',
  authDomain: 'reclamo-ciudadano.firebaseapp.com',
  databaseURL: 'https://reclamo-ciudadano.firebaseio.com',
  projectId: 'reclamo-ciudadano',
  storageBucket: 'reclamo-ciudadano.appspot.com',
  messagingSenderId: '492257378372',
  appId: '1:492257378372:web:76611954edc84dae8e3c11'
}

// eslint-disable-next-line no-unused-vars
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const st = firebase.storage()

export { db, st, firebase }
