const { initializeApp } = require("firebase/app")
const { getFirestore } = require("firebase/firestore")
const { getAuth } = require("firebase/auth")
const { getStorage } = require("firebase/storage")
require('custom-env').env("local")

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig)

const auth = getAuth()

const db = getFirestore(app);

const storage = getStorage(app)

module.exports = {db, auth, storage}