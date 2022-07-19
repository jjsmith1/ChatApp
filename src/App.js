import React from 'react'

import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({

  apiKey: "AIzaSyATmhAQzLeBoZqa0wwRU2WQECk3YcQ-pZI",
  authDomain: "chatapp-50c23.firebaseapp.com",
  projectId: "chatapp-50c23",
  storageBucket: "chatapp-50c23.appspot.com",
  messagingSenderId: "986474887069",
  appId: "1:986474887069:web:3e211a709e744eea70a174",
  measurementId: "G-J1B6YJ0Q08"

})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        
        <section>
          {user ? <chatApp /> : <SignIn />}
        </section>

      </header>
    </div>
  );
}

function SignIn() {
const signInWithGmail = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithGmailPopup(provider);
}
  return (
    <button onClick={signInWithGmail}>Login with Gmail</button>
  )
}

function SignOut () {
  return auth.currentUser && (
    <button onClick={() => auth.SignOut()}>Sign Out</button>
  )
}
function chatApp(){


const messageRef = firestore.colllection('message');
const query = messagesRef.orderBy('createdAt').limit(40);

const [messages] = useCollectionData(query, {idField: 'id'});

const [formValue, setFormValue] = useState('');

const sendMessage = async(e) => {
  e.preventDefault();
  const {uid, photoURL} = auth.currentUser;

  await messageRef.add({
    text: formValue,
  });

  setFormValue('');
}

return (
  <>
  <main>

    {messages && messages.map(msg => <chatMessage key={msg.id} message={msg}) />)}

  <div>

  </div>
  </main>

  <form onSubmit={sendMessage}>

    <input value ={formValue} onChange={(e) => setFormValue(e.target.value)}/>

    <button type = "submit"> 💲🗯</button>

  </form>
 </>
}

function chatMessage(props){
  
  const { text, uid, photoURL} = props.message;
 
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={'message ${messageClass}'}>

      <p>{text}</p>

    </div>
  )
}


export default App
