import firebase from 'firebase';



const firebaseConfig = {
  apiKey: "AIzaSyBdm8AbgZR8j6HBo3wZSFKr6KFj6l0Zv4Q",
  authDomain: "under18app.firebaseapp.com",
  projectId: "under18app",
  storageBucket: "under18app.appspot.com",
  messagingSenderId: "369978126145",
  appId: "1:369978126145:web:b797c4bd90cd23b505bbc0",
  measurementId: "${config.measurementId}"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();