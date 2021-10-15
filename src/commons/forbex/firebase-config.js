import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA63ukLAk1VMVNOkkYoajlPozgSLDUInhE',
  authDomain: 'forbex-contacto.firebaseapp.com',
  projectId: 'forbex-contacto',
  storageBucket: 'forbex-contacto.appspot.com',
  messagingSenderId: '1063692250917',
  appId: '1:1063692250917:web:c384af0575a38afaa7f4cc',
  measurementId: 'G-YESJFK4CCH',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp
