importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyDq09dMPV9M6DaYI0KhEMdCtM58qncwH2o",
  authDomain: "zoe-secondhand.firebaseapp.com",
  projectId: "zoe-secondhand",
  storageBucket: "zoe-secondhand.firebasestorage.app",
  messagingSenderId: "886684952854",
  appId: "1:886684952854:web:625298176528f357f88837"
})

const messaging = firebase.messaging()