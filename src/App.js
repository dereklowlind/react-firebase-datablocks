import './App.css'
import Mainpage from './pages/Mainpage'
import Secondpage from './pages/Secondpage'
import HeaderBar from './molecules/HeaderBar'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import DrawerMenu from './molecules/DrawerMenu'
import Helmet from 'react-helmet'
import firebase from 'firebase'
import 'firebase/firestore';
import { useEffect, useState } from 'react'


// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ5tem72h2ZoJHHev4qUNHxdGJ95zSVZ0",
  authDomain: "learning-boilerplate.firebaseapp.com",
  projectId: "learning-boilerplate",
  storageBucket: "learning-boilerplate.appspot.com",
  messagingSenderId: "541664366475",
  appId: "1:541664366475:web:cf023e8f8f5e588235698e",
  measurementId: "G-JT4KWMV5GD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();


function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // your variable here
  // const [submitSuccess, setSubmitSuccess] = useState(false)


  // //on component mount
  // useEffect(() => {
  //   console.log("using effect");
  // }, [submitSuccess]);



  return (
    <div className="App">
      <Helmet>
        <title>Datablocks</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700;800&display=swap" rel="stylesheet"/>
      </Helmet>
      <Router>
        <HeaderBar  db={db}  isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
        <div className="pageContainer">
          <DrawerMenu />
            <Switch>
              <Route path="/secondpage" render={() => (<Secondpage/>)} /> 
              <Route path="/" render={(props) => (<Mainpage db={db}   isSignedIn={isSignedIn}/>)}/>
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
