import firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDRvht3WsftYi-1hrC5Gbcx8rzLzkxoVcY",
  authDomain: "msg-app-d2743.firebaseapp.com",
  databaseURL: "https://msg-app-d2743-default-rtdb.firebaseio.com",
  projectId: "msg-app-d2743",
  storageBucket: "msg-app-d2743.appspot.com",
  messagingSenderId: "750289004030",
  appId: "1:750289004030:web:a046ff3d007da633dc8caf"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;