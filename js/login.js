(() => {
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

    const auth = firebase.auth();
    let me = null;

    const message = document.getElementById('message');
    const form = document.querySelector('form');
    const messages = document.getElementById('messages');
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');

    login.addEventListener('click', () => { 
        auth.signInAnonymously();
    });
    
    logout.addEventListener('click', () => { 
        auth.signOut();
    });

    auth.onAuthStateChanged(user => {
        if (user){
            me = user;

            while (messages.firstChild){
                messages.removeChild(messages.firstChild);
            }

            collection.orderBy('created').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added'){
                    const li =document.createElement('li');
                    const data = change.doc.data();
                    li.textContent = data.uid.substr(0,5) + ':' +  data.message;
                    messages.appendChild(li);
                    }
                });
            }, error => {});
            console.log(`Logged in as: ${user.uid}`);
            login.classList.add('hidden');
            [logout, form, messages].forEach(el => {
                el.classList.remove('hidden');
            });
            message.focus();
            return;
        }
        me = null;
        console.log('Nobody is logged in');
        login.classList.remove('hidden');
        // form.classList.remove('hidden');
        [logout, form, messages].forEach(el => {
            el.classList.add('hidden');
        });
    });


    form.addEventListener('submit', e => {
        e.preventDefault();

        const val = message.value.trim();
            if (val === ""){
                return;
            }

            message.value = '';
            message.focus();

            collection.add({
                message: val,
                created: firebase.firestore.FieldValue.serverTimestamp(),
                uid: me ? me.uid : 'noboby'
            })
            .then(doc => {
                console.log(`${doc.id} added!`);
            })
            .catch(error => {
                console.log(error);
                console.log('document add error!');
            });
    });

})();
