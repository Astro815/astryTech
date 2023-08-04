const firebaseConfig = {
    apiKey: "AIzaSyA6TgbczkHA6YqfTVR9RkTYnIgGXx3U2xs",
    authDomain: "cursos-bd821.firebaseapp.com",
    projectId: "cursos-bd821",
    storageBucket: "cursos-bd821.appspot.com",
    messagingSenderId: "843811912871",
    appId: "1:843811912871:web:6e56b59cff78140d6bef82",
    measurementId: "G-3NDYCGP03Y"
};

const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();