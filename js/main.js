'use strict';
  const firebaseConfig = {
    apiKey: "AIzaSyDiNVs7XdcGPRa6g236XnOpPc4HuBoIc_8",
    authDomain: "chatapp-97bac.firebaseapp.com",
    databaseURL: "https://chatapp-97bac.firebaseio.com",
    projectId: "chatapp-97bac",
    storageBucket: "chatapp-97bac.appspot.com",
    messagingSenderId: "689593171823",
    appId: "1:689593171823:web:7d0e1b5ed3d8b8eeb8f29a",
    measurementId: "G-WVYXCGLSK0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
  });
  const collection = db.collection('messages');

  const message = document.getElementById('message');
  const form = document.querySelector('form');

  form.addEventListener('submit', e => {
    e.preventDefault();
    collection.add({
        message: message.value
    })
    .then(doc => {
        console.log(`${doc.id} added!`);
        message.value = '';
        message.focus();
    })
    .catch(error => {
        console.log(error);
    });
  });

  message.focus();
