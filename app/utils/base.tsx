
import * as firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyASiLKT6AbCmXwQKTUfGgETXiXcZn83z8Q",
    authDomain: "taskriver.firebaseapp.com",
    databaseURL: "https://taskriver.firebaseio.com",
    projectId: "taskriver",
    storageBucket: "taskriver.appspot.com",
    messagingSenderId: "942832726020",
    appId: "1:942832726020:web:a3034663ab5f7e928f8551",
    measurementId: "G-QJD3ZYHZYY"
});

export default app;
